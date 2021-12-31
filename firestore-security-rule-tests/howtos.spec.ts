require('dotenv').config()
import * as testing from '@firebase/rules-unit-testing';
import { readFileSync } from 'fs';
import { setLogLevel, doc, getDoc, setDoc } from 'firebase/firestore'

const { initializeTestEnvironment, assertFails, assertSucceeds } = testing;

const DOCUMENT_BASE = `v3_howtos`;

describe(DOCUMENT_BASE, () => {
    let testEnv;
    beforeAll(async () => {

        // Silence expected rules rejections from Firestore SDK. Unexpected rejections
        // will still bubble up and will be thrown as an error (failing the tests).
        setLogLevel('error');

        testEnv = await initializeTestEnvironment({
            projectId: process.env.PROJECT_ID,
            firestore: { rules: readFileSync('../firestore.rules', 'utf8') },
        });
    })

    afterAll(async () => {
        await testEnv.cleanup();
    });

    beforeEach(async () => {
        await testEnv.clearFirestore();
    })

    describe('anonymous users', () => {
        it('allows READ', async () => {
            const unauthedDb = testEnv.unauthenticatedContext().firestore();

            await assertSucceeds(getDoc(doc(unauthedDb, `${DOCUMENT_BASE}/bar`)));
        });

        it('does not allow WRITE', async () => {
            const unauthedDb = testEnv.unauthenticatedContext().firestore();

            await assertFails(setDoc(doc(unauthedDb, `${DOCUMENT_BASE}/bar`), {
                foo: 'bar'
            }));
        });
    });

    describe('authenticated user', () => {
        it('can WRITE', async () => {
            const authedDb = testEnv.authenticatedContext('jasper').firestore();

            await assertSucceeds(setDoc(doc(authedDb, `${DOCUMENT_BASE}/new-document`), {
                foo: 'bar'
            }));
        });

        it('can not modify document created by another user', async () => {
            const authedDb = testEnv.authenticatedContext('jasper').firestore();
            await testEnv.withSecurityRulesDisabled(async (context) => {
                await setDoc(doc(context.firestore(), `${DOCUMENT_BASE}/not-jasper-doc`), { _createdBy: 'not-jasper' });
            });

            await assertFails(setDoc(doc(authedDb, `${DOCUMENT_BASE}/not-jasper-doc`), {
                foo: 'bar'
            }));
        })

        it('can modify document created by current user', async () => {
            const authedDb = testEnv.authenticatedContext('jasper').firestore();
            await testEnv.withSecurityRulesDisabled(async (context) => {
                await setDoc(doc(context.firestore(), `${DOCUMENT_BASE}/jasper-doc`), { _createdBy: 'jasper' });
            });

            await assertSucceeds(setDoc(doc(authedDb, `${DOCUMENT_BASE}/not-jasper-doc`), {
                foo: 'bar'
            }));
        })
    })

    describe('admin user', () => {
        it.skip('can modify document created by another user', async () => {
            // Arrange
            const authedDb = testEnv.authenticatedContext('jasper', { foo: 'breath' }).firestore();
            await testEnv.withSecurityRulesDisabled(async (context) => {
                await setDoc(doc(context.firestore(), `${DOCUMENT_BASE}/not-jasper-doc`), { _createdBy: 'not-jasper' });
            });

            // Act/Assert
            await assertSucceeds(setDoc(doc(authedDb, `${DOCUMENT_BASE}/not-jasper-doc`), {
                foo: 'bar'
            }));
        })
    })
});
import{j as o,a as t}from"./jsx-runtime-93f93352.js";import{E as n}from"./ExternalLink-5b28a631.js";import{I as c}from"./Icon-d2099435.js";import{F as s,a as v}from"./theme-ui-components.esm-f3994bb3.js";const r=e=>e.charAt(0).toUpperCase()+e.slice(1),d=(e,a)=>{switch(a){case"email":return`mailto:${e}`;default:return e.indexOf("http")===0?e:`http://${e}`}},p=[{pattern:new RegExp(/twitter\.com/),label:"Twitter"},{pattern:new RegExp(/facebook\.com/),label:"Facebook"},{pattern:new RegExp(/youtube\.com/),label:"Youtube"},{pattern:new RegExp(/instagram\.com/),label:"Instagram"}],m=(e,a)=>{const l=p.find(u=>u.pattern.test(a));return l?l.label:e&&r(e)},i=e=>{const{url:a,label:l}=e;return o(s,{sx:{justifyContent:"flex-start",alignItems:"center",flexDirection:"row",mt:0,...e.sx},children:[t(v,{children:t(c,{glyph:e.icon,size:22})}),t(n,{ml:2,color:"black",href:d(a,l),children:m(l,a)})]})};try{r.displayName="capitalizeFirstLetter",r.__docgenInfo={description:"",displayName:"capitalizeFirstLetter",props:{}}}catch{}try{i.displayName="ProfileLink",i.__docgenInfo={description:"",displayName:"ProfileLink",props:{url:{defaultValue:null,description:"",name:"url",required:!0,type:{name:"string"}},label:{defaultValue:null,description:"",name:"label",required:!0,type:{name:"string"}},icon:{defaultValue:null,description:"",name:"icon",required:!0,type:{name:"enum",value:[{value:'"time"'},{value:'"filter"'},{value:'"image"'},{value:'"view"'},{value:'"download"'},{value:'"email"'},{value:'"step"'},{value:'"download-cloud"'},{value:'"upload"'},{value:'"add"'},{value:'"check"'},{value:'"arrow-back"'},{value:'"arrow-full-down"'},{value:'"arrow-full-up"'},{value:'"arrow-forward"'},{value:'"arrow-down"'},{value:'"mail-outline"'},{value:'"notifications"'},{value:'"account-circle"'},{value:'"lock"'},{value:'"close"'},{value:'"delete"'},{value:'"more-vert"'},{value:'"comment"'},{value:'"turned-in"'},{value:'"edit"'},{value:'"difficulty"'},{value:'"pdf"'},{value:'"loading"'},{value:'"location-on"'},{value:'"external-link"'},{value:'"facebook"'},{value:'"instagram"'},{value:'"slack"'},{value:'"chevron-left"'},{value:'"chevron-right"'},{value:'"star"'},{value:'"star-active"'},{value:'"thunderbolt"'},{value:'"external-url"'},{value:'"useful"'},{value:'"verified"'},{value:'"supporter"'},{value:'"flag-unknown"'},{value:'"social-media"'},{value:'"discord"'},{value:'"website"'},{value:'"bazar"'},{value:'"email-outline"'}]}},sx:{defaultValue:null,description:"",name:"sx",required:!1,type:{name:"ThemeUICSSObject"}}}}}catch{}export{i as P};
//# sourceMappingURL=ProfileLink-ae9d5db0.js.map
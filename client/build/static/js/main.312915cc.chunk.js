(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{163:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),o=a(52),r=a.n(o),c=(a(88),a(1)),i=a(2),l=a(5),u=a(4),p=a(6),m=(a(89),a(8)),h=a(7),d=a.n(h),f=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,s=new Array(n),o=0;o<n;o++)s[o]=arguments[o];return(a=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(s)))).state={user:a.props.user},a.handleLogout=function(e){d.a.post("/auth/logout").then(function(){e.setUser(null)})},a}return Object(p.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"navbar"},s.a.createElement("div",{className:"logo"}),s.a.createElement("div",{className:"head-menu"},s.a.createElement("ul",null,!this.props.user&&s.a.createElement("li",null," ",s.a.createElement(m.b,{to:"/login"},"Log in")),!this.props.user&&s.a.createElement("li",null," ",s.a.createElement(m.b,{to:"/signup"},"Sign up")),this.props.user&&s.a.createElement("li",null,s.a.createElement(m.b,{to:"/user/".concat(this.props.user.username)},"Profile")),this.props.user&&s.a.createElement("li",null,s.a.createElement(m.b,{to:"/user/".concat(this.props.user.username,"/new-space")},"New Space")),this.props.user&&s.a.createElement("li",null,s.a.createElement(m.b,{onClick:function(){return e.handleLogout(e.props)},to:"/login"},"Logout")))))}}]),t}(n.Component),v=a(19),y=a(12),b=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=0,t=0,a=document.getElementsByClassName("App");function n(e,t,a,n,s){return(e-t)*(s-n)/(a-t)+n}document.addEventListener("mousemove",function(s){return e=s.pageX,t=s.pageY,e<0&&(e=0),t<0&&(t=0),e=Math.floor(n(e,0,window.innerWidth,0,255)),t=Math.floor(n(t,0,window.innerHeight,0,255)),a.length>0&&(a[0].style.backgroundImage=" linear-gradient(\n        to right,\n        rgba(".concat(e,", 0, ").concat(t,"),\n        rgba(").concat(t,", 0, 0)\n      )")),!0})}},{key:"render",value:function(){return s.a.createElement("div",null)}}]),t}(n.Component),g=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,s=new Array(n),o=0;o<n;o++)s[o]=arguments[o];return(a=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(s)))).state={username:"",password:""},a.handleChange=function(e){var t=e.target.name,n=e.target.value;a.setState(Object(y.a)({},t,n))},a.handleSubmit=function(e){e.preventDefault(),console.log("submit"),d.a.post("/auth/login",{username:a.state.username,password:a.state.password}).then(function(e){a.props.setUser(e.data),a.props.history.push("/user/".concat(e.data.username))}).catch(function(e){return console.log(e)})},a}return Object(p.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"login"},s.a.createElement("form",{className:"auth-form",method:"post",onSubmit:this.handleSubmit},s.a.createElement("label",{htmlFor:"username",name:"username"}),s.a.createElement("input",{className:"authInput",onChange:this.handleChange,type:"text",name:"username",id:"username",placeholder:"username",value:this.state.username}),s.a.createElement("label",{htmlFor:"password",name:"password"}),s.a.createElement("input",{className:"authInput",onChange:this.handleChange,type:"password",name:"password",id:"password",placeholder:"password",value:this.state.password}),s.a.createElement("button",{class:"authButton",type:"submit"},"Log in"),s.a.createElement("p",{className:"logp"},"Don't have an account? ",s.a.createElement(m.b,{to:"/signup"},"Create one"))),s.a.createElement(b,null))}}]),t}(n.Component),E=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,s=new Array(n),o=0;o<n;o++)s[o]=arguments[o];return(a=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(s)))).state={username:"",password:""},a.handleChange=function(e){console.log(e.target.value);var t=e.target.name,n=e.target.value;a.setState(Object(y.a)({},t,n))},a.handleSubmit=function(e){e.preventDefault(),console.log("submit"),d.a.post("/auth/signup",{username:a.state.username,password:a.state.password}).then(function(e){console.log(e)}).catch(function(e){return console.log(e)})},a}return Object(p.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"signup"},s.a.createElement("form",{className:"auth-form",method:"post",onSubmit:this.handleSubmit},s.a.createElement("label",{htmlFor:"username",name:"username"}),s.a.createElement("input",{className:"authInput",onChange:this.handleChange,type:"text",name:"username",id:"username",placeholder:"choose username",value:this.state.username}),s.a.createElement("label",{htmlFor:"password",name:"password"}),s.a.createElement("input",{className:"authInput",onChange:this.handleChange,type:"password",name:"password",id:"password",placeholder:"choose password",value:this.state.password}),s.a.createElement("button",{className:"authButton",type:"submit"},"Sign up"),s.a.createElement("p",{className:"logp"},"Already have an account ? ",s.a.createElement(m.b,{to:"/login"},"Log in"))))}}]),t}(n.Component),w=a(38),k=function(e){var t=e.component,a=e.user,n=e.path,o=e.redirectPath,r=void 0===o?"/":o,c=Object(w.a)(e,["component","user","path","redirectPath"]);return s.a.createElement(v.b,{path:n,render:function(e){return a?s.a.createElement(t,Object.assign({},e,c,{user:a})):s.a.createElement(v.a,{to:r})}})},O=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,s=new Array(n),o=0;o<n;o++)s[o]=arguments[o];return(a=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(s)))).handledelete=function(e){d.a.post("/user/:userName/:spaceName/delete",{id:e}).then(function(){return console.log("done")}).catch(function(e){return console.log(e)}),a.props.updateState(e)},a}return Object(p.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"spacerow"},s.a.createElement("button",{className:"deletebutton",onClick:function(){return e.handledelete(e.props.space._id)}},"X"),s.a.createElement(m.b,{to:"/user/".concat(this.props.username,"/").concat(this.props.space.title)},s.a.createElement("h4",null,this.props.space.title)))}}]),t}(n.Component),j=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,s=new Array(n),o=0;o<n;o++)s[o]=arguments[o];return(a=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(s)))).state={list:[]},a.componentDidMount=function(){d.a.get("/api/user/likedSpaces",{user:a.props.user}).then(function(e){a.setState({list:e.data})}).catch(function(e){return console.log(e)})},a}return Object(p.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.state.list.map(function(e){return s.a.createElement("li",{key:e._id},s.a.createElement(m.b,{to:"/user/".concat(e.ownerName,"/").concat(e.title)},e.title," by ",e.ownerName))});return s.a.createElement("div",{id:"favoritelist"},s.a.createElement("h4",null,"Liked spaces"),s.a.createElement("ul",null,e))}}]),t}(n.Component),C=a(29),S=a.n(C),N=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){console.log(this.props.soundKnots),setTimeout(function(){var e=document.querySelectorAll(".arrow");document.querySelector("body").addEventListener("mousemove",function(t){e.forEach(function(e){var a=e.getBoundingClientRect(),n=a.left+a.width/2,s=a.top+a.height/2;e.style.transform="rotate("+Math.atan2(t.clientY-s,t.clientX-n)+"rad)"})})},1)}},{key:"render",value:function(){return s.a.createElement("div",{id:"box"},s.a.createElement("div",{class:"arrow arrow1"},"-----\x3e"),s.a.createElement("div",{class:"arrow arrow2"},"-----\x3e"),s.a.createElement("div",{class:"arrow arrow3"},"-----\x3e"),s.a.createElement("div",{class:"arrow arrow4"},"-----\x3e"))}}]),t}(n.Component),x=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,s=new Array(n),o=0;o<n;o++)s[o]=arguments[o];return(a=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(s)))).state={user:a.props.user,portfolio:[],otherSpaces:[]},a.componentDidMount=function(){d.a.get("/api/user/".concat(a.props.user.username)).then(function(e){a.setState({portfolio:a.state.portfolio.concat(e.data)})}).catch(function(e){return console.log(e)})},a.updateState=function(e){a.setState({portfolio:a.state.portfolio.filter(function(t){return t._id!==e})})},a}return Object(p.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this,t=this.state.portfolio.map(function(t){return s.a.createElement(O,{key:t._id,space:t,username:e.state.user.username,updateState:e.updateState})});return s.a.createElement("div",{className:"portfolio"},s.a.createElement("div",{className:"list"},s.a.createElement(j,{user:this.state.user}),s.a.createElement("div",null,s.a.createElement("h2",null,"My spaces"),t,s.a.createElement(b,null),s.a.createElement(N,null))))}}]),t}(n.Component),D=a(31),A=["ionian","dorian","phrygian","lydian","mixolydian","eolian","locrian"],M=["C","D","E","F","G","A","B"],F=["#","n","b"],I=[1,2,3,4,5],B=a(3),P=["vanilla","mint","grappe"],q={vanilla:{oscillator:{type:"sawtooth"},envelope:{attack:.1,release:.2},filterEnvelope:{attack:.9,decay:.4,sustain:.7,release:.4}},mint:{oscillator:{type:"square"},envelope:{attack:1.4,decay:.5,sustain:.9,release:1.7},filter:{type:"peaking",q:.2,gain:2,frequency:.01},filterEnvelope:{attack:9e-5,decay:4e-5,sustain:.007,release:.9}},grappe:{oscillator:{type:"sawtooth",detune:6},envelope:{attack:.6,decay:1.5,decayCurve:"exponential",release:.9},filter:{type:"lowpass"},filterEnvelope:{attack:.03,decay:1.7,sustain:7e-4,release:1.4,octaves:5}}},U=a(111),L=function(){function e(){Object(c.a)(this,e),this.intervals=[0,2,4,5,7,9,11],this.modes=["ionian","dorian","phrygian","lydian","mixolydian","eolian","locrian"],this.notes=["G#/Ab","An","A#/Bb","Bn/Cb","Cn","C#/Db","Dn","D#/Eb","En/Fb","Fn","F#/Gb","Gn"],this.freq=[415.3/3,440/3,466.16/3,493.88/3,523.25/3,184.79,587.33/3,622.25/3,219.75,698.46/3,739.99/3,261.33]}return Object(i.a)(e,[{key:"scale",value:function(e,t,a,n,s){var o=this,r=this.notes.find(function(a){return a.includes(e+t)}),c=this.intervals.slice(),i=c.splice(this.modes.indexOf(n)).concat(c.map(function(e){return e+12}));return(i=i.map(function(e){return e-i[0]})).map(function(e){return o.notes[(o.notes.indexOf(r)+e)%12]}).map(function(e){var t=U();return{note:(e.includes("#")?e.split("/")[0]:e.includes("n")?e.split("n")[0]:e).concat(String(a)),position:[parseInt(Math.random()*window.innerWidth),parseInt(Math.random()*(window.innerHeight-300)+300)],id:t,start:!1,flavor:q[s],actave:a,synth:new B.MonoSynth(q[s]).toMaster()}})}}]),e}(),T=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,s=new Array(n),o=0;o<n;o++)s[o]=arguments[o];return(a=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(s)))).state={showScalePrompt:!1,inputScale:A[0],inputNote:M[0],inputAccidentals:F[0],inputOctaves:I[2],inputFlavor:P[0],listOfOctaves:I,listOfModes:A,listOfNotes:M,listOfAccidentals:F,listOfFlavors:P},a.generateScale=function(){a.setState({showScalePrompt:!a.state.showScalePrompt})},a.handleChange=function(e){var t=e.target,n=t.name,s=t.value;a.setState(Object(y.a)({},n,s))},a.handleSubmit=function(e){e.preventDefault();var t=a.state,n=t.inputScale,s=t.inputNote,o=t.inputAccidentals,r=t.inputOctaves,c=t.inputFlavor;a.setState({showScalePrompt:!1}),a.props.generateScale(n,s,o,r,c)},a}return Object(p.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return s.a.createElement("div",{className:"center"},s.a.createElement("button",{className:"cbutton3",onClick:this.generateScale},this.state.showScalePrompt?"cancel":"new space"),this.state.showScalePrompt&&s.a.createElement("form",{className:"newForm",onSubmit:this.handleSubmit},s.a.createElement("select",{className:"select-css",onChange:this.handleChange,name:"inputNote",value:this.state.inputNote},this.state.listOfNotes.map(function(e,t){return s.a.createElement("option",{key:t,value:e},e)})),s.a.createElement("select",{className:"select-css",onChange:this.handleChange,name:"inputAccidentals",value:this.state.inputAccidentals},this.state.listOfAccidentals.map(function(e,t){return s.a.createElement("option",{key:t,value:e},e)})),s.a.createElement("select",{className:"select-css",onChange:this.handleChange,name:"inputOctaves",value:this.state.inputOctaves},this.state.listOfOctaves.map(function(e,t){return s.a.createElement("option",{key:t,value:e},e)})),s.a.createElement("select",{className:"select-css",onChange:this.handleChange,name:"inputScale",value:this.state.inputScale},this.state.listOfModes.map(function(e,t){return s.a.createElement("option",{key:t,value:e},e)})),s.a.createElement("select",{className:"select-css",onChange:this.handleChange,name:"inputFlavor",value:this.state.inputFlavor},this.state.listOfFlavors.map(function(e,t){return s.a.createElement("option",{key:t,value:e},e)})),s.a.createElement("button",{className:"cbutton2",type:"submit"},"Create")))}}]),t}(n.Component),G=a(80),R=a.n(G),V=a(3),X=a.n(V),Y=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,s=new Array(n),o=0;o<n;o++)s[o]=arguments[o];return(a=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(s)))).state={space:a.props.nodes?a.props.nodes:null,showInputTitle:!1,showInstruction:!0,spaceName:"",soundComponents:[],displayNoteName:!1},a.handleDelete=function(e){a.setState({space:a.state.space.filter(function(t){return t.synth.triggerRelease(),t.id!==e})})},a.generateScale=function(e,t,n,s,o){a.state.space&&a.state.space.map(function(e){return e.synth.triggerRelease(),e});var r=(new L).scale(t,n,s,e,o);a.state.space?a.setState({space:a.state.space.concat(r).map(function(e){return Object(D.a)({},e,{synth:new X.a.MonoSynth(e.flavor).toMaster()})})}):a.setState({space:r})},a.move=function(e,t){var n=e.clientX,s=e.clientY;a.setState({space:a.state.space.map(function(e){return e.id===t&&(e.position[0]=n,e.position[1]=s),e})})},a.save=function(){a.setState({showInputTitle:!0})},a.nameSpace=function(e){var t=e.target,n=t.name,s=t.value;a.setState(Object(y.a)({},n,s))},a.saveSpace=function(){var e=[];for(var t in a.state.space){var n=a.state.space[t],s=(n.synth,Object(w.a)(n,["synth"]));e.push(s)}d.a.post("/api/user/".concat(a.props.user.username,"/new-space"),Object(D.a)({},a.state,{space:e})).then(function(){a.setState({showInputTitle:!1})}).catch(function(e){return console.log(e)})},a.distance=function(e){a.state.space&&a.setState({space:a.state.space.map(function(t){return Math.sqrt(Math.pow(t.position[0]-e.clientX,2)+Math.pow(t.position[1]-e.clientY,2))<150?(t.start=!0,t.synth.triggerAttack(t.note)):(t.start=!1,t.synth.triggerRelease()),t})})},a.hideInstruction=function(){a.setState({showInstruction:!1})},a.displayNoteName=function(){a.setState({displayNoteName:!a.state.displayNoteName})},a}return Object(p.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this,t=this.state.space&&this.state.space.map(function(t){var a={x:t.position[0],y:t.position[1]};return s.a.createElement("div",{key:t.id},s.a.createElement(R.a,{defaultPosition:a,onDrag:function(a){return e.move(a,t.id)}},s.a.createElement("div",{style:{width:10,height:10,backgroundColor:"lightcoral",borderRadius:"50%",position:"absolute",left:0,top:0}},s.a.createElement("button",{style:{border:"none",background:"none",margin:"6px"},onClick:function(){return e.handleDelete(t.id)}},"x"),e.state.displayNoteName&&s.a.createElement("p",null,String(t.note)))))});return s.a.createElement("div",{className:"editmap",style:{width:"100vw",height:"100vh"},onMouseDown:this.hideInstruction,onMouseMove:this.distance},this.state.showInstruction&&s.a.createElement("h3",{style:{marginTop:"160px"}},"create your scale here"),s.a.createElement(T,{generateScale:this.generateScale}),this.state.space&&s.a.createElement("button",{className:"cbutton4 saving",onClick:this.save},"Save"),this.state.displayNoteName&&null!==this.state.space?s.a.createElement("button",{className:"cbutton6",onClick:this.displayNoteName},"Hide note"):null!==this.state.space&&s.a.createElement("button",{className:"cbutton6",onClick:this.displayNoteName},"Display note"),this.state.showInputTitle&&s.a.createElement(s.a.Fragment,null,s.a.createElement("input",{className:"inputf",name:"spaceName",onChange:this.nameSpace,type:"text",placeholder:"Name your space"})," ",s.a.createElement("button",{className:"cbutton5",onClick:this.saveSpace},"Done")),t,this.state.soundComponents&&this.state.soundComponents)}}]),t}(n.Component),W=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,s=new Array(n),o=0;o<n;o++)s[o]=arguments[o];return(a=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(s)))).state={list:[]},a.componentDidMount=function(){console.log("component mounted list of spaces"),d.a.get("/api/user/getall").then(function(e){console.log(e.data),a.setState({list:e.data})}).catch(function(e){return console.log(e)})},a}return Object(p.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.state.list.map(function(e){return s.a.createElement("li",{key:e._id},s.a.createElement(m.b,{to:"/user/".concat(e.ownerName,"/").concat(e.title)},e.title," by ",e.ownerName))});return s.a.createElement("div",{id:"likelist"},s.a.createElement("h4",null,"Spaces"),s.a.createElement("ul",null,e))}}]),t}(n.Component),_=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){S()(document).on("mousedown",function(e){S()(".hole").removeClass("hole").addClass("largehole")}),S()(document).on("mouseup",function(){S()(".largehole").removeClass("largehole").addClass("hole")});var e=function(e){var t=document.getElementsByClassName("hole");document.getElementsByClassName("largehole").length>0?(document.getElementById("chartdiv").style.left=e.pageX-250+"px",document.getElementById("chartdiv").style.top=e.pageY-250+"px"):t.length>0&&(document.getElementById("chartdiv").style.left=e.pageX-50+"px",document.getElementById("chartdiv").style.top=e.pageY-50+"px")};window.addEventListener("mousemove",e),window.addEventListener("mouseup",e),window.addEventListener("mousedown",e)}},{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement("div",{id:"chartdiv",class:"hole"}),s.a.createElement(N,null))}}]),t}(n.Component),z=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,s=new Array(n),o=0;o<n;o++)s[o]=arguments[o];return(a=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(s)))).state={currentUser:"",username:"",title:"",nodes:[],ownerName:"",spaceId:"",mouseDown:!1,bookmarked:null},a.mouseDown=function(){a.setState({mouseDown:!0})},a.mouseUp=function(){a.setState({mouseDown:!1,nodes:a.state.nodes.map(function(e){return e.amp=0,e.start=!1,e.synth.triggerRelease(),e})})},a.distance=function(e){a.state.mouseDown&&a.state.nodes&&a.setState({nodes:a.state.nodes.map(function(t){return Math.sqrt(Math.pow(t.position[0]-e.clientX,2)+Math.pow(t.position[1]-e.clientY,2))<150?(t.start=!0,t.synth.triggerAttack(t.note)):(t.start=!1,t.synth.triggerRelease()),t})})},a.handleBookmark=function(){d.a.post("/api/user/".concat(a.state.username,"/like-space"),{spaceId:a.state.spaceId,user:a.props.user}).then(function(){console.log("".concat(a.state.title," has been saved iy your bookmarks :)"))}).catch(function(e){return console.log(e)})},a.handleUnlike=function(){d.a.post("/api/user/".concat(a.state.username,"/unlike-space"),{spaceId:a.state.spaceId,user:a.props.user}).then(function(){console.log("".concat(a.state.title," has been saved iy your bookmarks :)"))}).catch(function(e){return console.log(e)})},a.handleEditSpace=function(){},a.componentDidMount=function(){a.load()},a.componentDidUpdate=function(e){e.match.params.userName===a.props.match.params.userName&&e.match.params.spaceName===a.props.match.params.spaceName||a.load()},a.load=function(){var e=a.props.match.params,t=e.userName,n=e.spaceName;a.setState({username:t}),d.a.get("/api/user/".concat(t,"/").concat(n)).then(function(e){a.setState({title:e.data[0].title,nodes:e.data[0].nodes.map(function(e){return Object(D.a)({},e,{synth:new X.a.MonoSynth(e.flavor).toMaster()})}),ownerName:e.data[0].ownerName,spaceId:e.data[0]._id},function(){return console.log(a.state)})}).catch(function(e){return console.log(e)})},a}return Object(p.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.state.nodes.map(function(e){return s.a.createElement("div",{key:e.id,style:{position:"absolute",left:e.position[0],top:e.position[1]}},s.a.createElement("div",{className:"node"}))});return s.a.createElement("div",{className:"map pointer",style:{width:"100vw",height:"100vh"},onMouseDown:this.mouseDown,onMouseUp:this.mouseUp,onMouseMove:this.distance},s.a.createElement(W,null),s.a.createElement("h4",{id:"placename"},this.state.title," by ",this.state.username),this.state.ownerName!==this.props.user.username?this.props.user.favoriteSpaces.includes(this.state.spaceId)?s.a.createElement("button",{className:"likebutton",onClick:this.handleUnlike},"Remove from favorites"):s.a.createElement("button",{className:"likebutton",onClick:this.handleBookmark},"Add to favorites"):null,this.state.ownerName===this.props.user.username&&s.a.createElement(m.b,{to:"/user/".concat(this.state.username,"/edit-space/").concat(this.state.spaceId)},s.a.createElement("button",{onClick:this.handleEditSpace},"Edit")),e,s.a.createElement(b,null),s.a.createElement(_,null))}}]),t}(n.Component),H=(n.Component,a(81)),J=a.n(H),K=a(82),Q=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={isStopped:!1,isPaused:!1},a}return Object(p.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e={loop:!0,autoplay:!0,animationData:K,rendererSettings:{preserveAspectRatio:"xMidYMid slice"}};return s.a.createElement("div",null,s.a.createElement(J.a,{options:e,top:200,height:400,width:400,isStopped:this.state.isStopped,isPaused:this.state.isPaused}))}}]),t}(s.a.Component),$=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"landing2"},s.a.createElement(Q,null))}}]),t}(n.Component),Z=function(e){function t(e){var a;Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).playSound=function(){var e=arguments.length<=0?void 0:arguments[0],t=arguments.length<=1?void 0:arguments[1],n=arguments.length<=2?void 0:arguments[2];a.activateKeys(e,t,n)},a.activateKeys=function(e,t,n){Object.keys(ee).forEach(function(s){e.includes(s)&&(ee[s].play=!0,ee[s].flavor=t,ee[s].amp=n,console.log(ee[s]),a.setState(Object(y.a)({},s,!0)))})};var n=new X.a.Limiter(-3),s=new X.a.Channel({volume:0}),o=new X.a.Channel({pan:0,volume:0}),r=new X.a.Filter({type:"notch",frequency:800,q:0,gain:0}),i=new X.a.Envelope({attack:.1,decay:.3,sustain:.1,release:.4,decayCurve:"exponential"}),p=new X.a.LFO({type:"sine",frequency:"48n",amplitude:1});p.connect(r),i.connect(r);var m=new X.a.PingPongDelay(2).chain(o,r),h=new X.a.Channel({pan:0,volume:0}),d=new X.a.Chorus({frequency:2,delayTime:0,depth:0,spread:66,type:"sine",feedback:0}).chain(h),f=new X.a.Channel({pan:0,volume:0}),v=new X.a.PitchShift({pitch:-1.8,windowSize:.8,delayTime:0,feedback:0,wet:0}).chain(f),b=new X.a.Channel({pan:0,volume:0}),g=new X.a.Vibrato({frequency:5,depth:0,type:"sine"}),E=new X.a.Tremolo({frequency:0,type:"sawtooth",depth:0,spread:180}).chain(b,g),w=new X.a.Channel({pan:0,volume:0}),k=new X.a.Chebyshev({order:150,oversample:"none"}),O=new X.a.FeedbackDelay({delayTime:0,feedback:0,wet:0}),j=new X.a.BitCrusher({bits:24}).chain(w,k,O),C=new X.a.AutoWah({baseFrequency:100,octaves:6,sensitivity:0,Q:0,gain:0,follower:{attack:.3,release:.5}}),S=new X.a.PanVol({pan:0,volume:-9}),N=new X.a.Freeverb({roomSize:0,dampening:300}).chain(S,C),x=new X.a.PanVol({pan:0,volume:-24}),D=new X.a.Filter({type:"lowpass",frequency:350}),A=new X.a.JCReverb({roomSize:0}).chain(x,D),M=new X.a.PitchShift({pitch:.08,windowSize:.1,delayTime:.03,wet:1}),F=new X.a.PanVol({pan:0,volume:-2}),I=new X.a.Phaser({frequency:5,octaves:.3,Q:0,baseFrequency:9}).chain(F,M),B=new X.a.FMSynth({harmonicity:0,modulationIndex:0,oscillator:{type:"sine",modulationType:"sine",modulationIndex:0,harmonicity:0},envelope:{attack:8,decay:15,sustain:1,release:.002,attackCurve:"exponential"},modulation:{volume:0,type:"triangle"},modulationEnvelope:{attack:1,decay:.04,sustain:.5,release:.2},volume:0,frequency:0});return a.state={synth:B,delayChannel:o,filter:r,envelope:i,lfo:p,chorusChannel:h,chorus:d,pitchShiftChannel:f,pitchShift:v,tremoloChannel:b,vibrato:g,tremolo:E,bitCrusherChannel:w,chebyshev:k,feedBackDelay:O,bitCrusher:j,autoWah:C,freeVerbChannel:S,freeVerb:N,jcVerbChannel:x,verbFilter:D,jcReverb:A,phaseChannel:F,phasePitch:F,phaser:I,limiter:n,globalChannel:s,space:{amp:0,flavor:"",note:"",start:!1},synthOn:new X.a.Event(function(e,t){console.log("it"),B.triggerAttack("C3","8n"),i.triggerAttack()}),synthOff:new X.a.Event(function(e,t){B.triggerRelease("C3","8n"),i.triggerRelease(),console.log("made")})},B.connect(n),n.fan(m,d,v,E,j,N,A,I),m.connect(s),d.connect(s),v.connect(s),E.connect(s),j.connect(s),N.connect(s),A.connect(s),I.connect(s),s.connect(X.a.Master),a}return Object(p.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){this.audioContext=new AudioContext}},{key:"componentWillUnmount",value:function(){}},{key:"render",value:function(){return console.log(this.props.match.params),s.a.createElement("div",null,this.props.match.params.spaceName?s.a.createElement(z,Object.assign({user:this.props.user},this.props,{playSound:this.playSound})):s.a.createElement(Y,Object.assign({user:this.props.user},this.props,{playSound:this.playSound})))}}]),t}(n.Component),ee={C:{play:!1,flavor:"",note:"C",amp:0},"C#":{play:!1,flavor:"",note:"C#",amp:0},D:{play:!1,flavor:"",note:"D",amp:0},"D#":{play:!1,flavor:"",note:"D#",amp:0},E:{play:!1,flavor:"",note:"E",amp:0},F:{play:!1,flavor:"",note:"F",amp:0},"F#":{play:!1,flavor:"",note:"F#",amp:0},G:{play:!1,flavor:"",note:"G",amp:0},"G#":{play:!1,flavor:"",note:"G#",amp:0},A:{play:!1,flavor:"",note:"A",amp:0},"A#":{play:!1,flavor:"",note:"A#",amp:0},B:{play:!1,flavor:"",note:"B",amp:0}},te=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,s=new Array(n),o=0;o<n;o++)s[o]=arguments[o];return(a=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(s)))).state={user:a.props.user},a.setUser=function(e){a.setState({user:e})},a}return Object(p.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"App landing"},s.a.createElement("div",{className:"border"}),s.a.createElement(f,{className:"navv",user:this.state.user,setUser:this.setUser}),s.a.createElement(v.d,null,s.a.createElement(v.b,{exact:!0,path:"/",component:$}),s.a.createElement(v.b,{path:"/login",render:function(t){return s.a.createElement(g,Object.assign({user:e.state.user,setUser:e.setUser},t))}}),s.a.createElement(v.b,{path:"/signup",component:E}),s.a.createElement(v.b,{path:"/logout",component:g}),s.a.createElement(k,{exact:!0,path:"/user/:userName",redirectPath:"/login",setUser:this.setUser,user:this.state.user,component:x}),s.a.createElement(k,{exact:!0,path:"/user/:userName/new-space",redirectPath:"/login",setUser:this.setUser,user:this.state.user,component:Z}),s.a.createElement(v.b,{exact:!0,path:"/user/:userName/:spaceName",render:function(t){return s.a.createElement(Z,Object.assign({user:e.state.user},t))}})),s.a.createElement(b,null))}}]),t}(s.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));d.a.get("/auth/loggedin").then(function(e){r.a.render(s.a.createElement(m.a,null,s.a.createElement(te,{user:e.data})),document.getElementById("root"))}).catch(function(e){console.log(e)}),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},82:function(e){e.exports={v:"5.5.2",fr:30,ip:0,op:90,w:500,h:500,nm:"Comp 1",ddd:0,assets:[],layers:[{ddd:0,ind:1,ty:4,nm:"Ball",sr:1,ks:{o:{a:1,k:[{i:{x:[.833],y:[.833]},o:{x:[.167],y:[.167]},t:0,s:[0]},{i:{x:[.833],y:[.833]},o:{x:[.167],y:[.167]},t:5,s:[100]},{i:{x:[.833],y:[.833]},o:{x:[.167],y:[.167]},t:60,s:[100]},{t:70,s:[0]}],ix:11},r:{a:0,k:0,ix:10},p:{s:!0,x:{a:0,k:250,ix:3},y:{a:1,k:[{i:{x:[.689],y:[1]},o:{x:[.213],y:[1.081]},t:10,s:[255]},{i:{x:[.284],y:[1]},o:{x:[.918],y:[0]},t:24,s:[242.838]},{i:{x:[.348],y:[1]},o:{x:[.589],y:[-.009]},t:50,s:[426.703]},{t:60,s:[409.703]}],ix:4}},a:{a:0,k:[0,0,0],ix:1},s:{a:0,k:[114,114,100],ix:6}},ao:0,shapes:[{ty:"gr",it:[{d:1,ty:"el",s:{a:0,k:[28.594,28.594],ix:2},p:{a:0,k:[0,0],ix:3},nm:"Ellipse Path 1",mn:"ADBE Vector Shape - Ellipse",hd:!1},{ty:"fl",c:{a:0,k:[.129411764706,.129411764706,.129411764706,1],ix:4},o:{a:0,k:100,ix:5},r:1,bm:0,nm:"Fill 1",mn:"ADBE Vector Graphic - Fill",hd:!1},{ty:"tr",p:{a:0,k:[.297,-72.703],ix:2},a:{a:0,k:[0,0],ix:1},s:{a:0,k:[100,100],ix:3},r:{a:0,k:0,ix:6},o:{a:0,k:100,ix:7},sk:{a:0,k:0,ix:4},sa:{a:0,k:0,ix:5},nm:"Transform"}],nm:"Ellipse 1",np:3,cix:2,bm:0,ix:1,mn:"ADBE Vector Group",hd:!1}],ip:0,op:90,st:0,bm:0},{ddd:0,ind:2,ty:4,nm:"Mouse",sr:1,ks:{o:{a:0,k:100,ix:11},r:{a:0,k:0,ix:10},p:{s:!0,x:{a:0,k:250,ix:3},y:{a:0,k:250,ix:4}},a:{a:0,k:[0,0,0],ix:1},s:{a:0,k:[100,100,100],ix:6}},ao:0,hasMask:!0,masksProperties:[{inv:!1,mode:"f",pt:{a:0,k:{i:[[0,0],[0,0],[0,-58.818],[0,0],[-58.818,0],[0,0],[0,58.818],[0,0],[58.818,0]],o:[[0,0],[-58.818,0],[0,0],[0,58.818],[0,0],[58.818,0],[0,0],[0,-58.818],[0,0]],v:[[.5,-186.5],[.5,-186.5],[-106,-80],[-106,81],[.5,187.5],[.5,187.5],[107,81],[107,-80],[.5,-186.5]],c:!0},ix:1},o:{a:0,k:100,ix:3},x:{a:0,k:0,ix:4},nm:"Mask 1"}],shapes:[{ty:"gr",it:[{ind:0,ty:"sh",ix:1,ks:{a:0,k:{i:[[-47.696,0],[0,-47.696],[0,0],[47.696,0],[0,47.696],[0,0]],o:[[47.696,0],[0,0],[0,47.696],[-47.696,0],[0,0],[0,-47.696]],v:[[0,-167],[86.5,-80.5],[86.5,80.5],[0,167],[-86.5,80.5],[-86.5,-80.5]],c:!0},ix:2},nm:"Path 1",mn:"ADBE Vector Shape - Group",hd:!1},{ty:"st",c:{a:0,k:[.129411764706,.129411764706,.129411764706,1],ix:3},o:{a:0,k:100,ix:4},w:{a:0,k:18,ix:5},lc:1,lj:1,ml:4,bm:0,nm:"Stroke 1",mn:"ADBE Vector Graphic - Stroke",hd:!1},{ty:"tr",p:{a:0,k:[0,0],ix:2},a:{a:0,k:[0,0],ix:1},s:{a:0,k:[100,100],ix:3},r:{a:0,k:0,ix:6},o:{a:0,k:100,ix:7},sk:{a:0,k:0,ix:4},sa:{a:0,k:0,ix:5},nm:"Transform"}],nm:"Shape 1",np:3,cix:2,bm:0,ix:1,mn:"ADBE Vector Group",hd:!1}],ip:0,op:90,st:0,bm:0}],markers:[]}},83:function(e,t,a){e.exports=a(163)},88:function(e,t,a){},89:function(e,t,a){}},[[83,1,2]]]);
//# sourceMappingURL=main.312915cc.chunk.js.map
function JSRTC(a){function b(b){k=new RTCPeerConnection,k.onicecandidate=d,a.onstream&&(k.ontrack=c);for(var g of m){l[g.id]||(l[g.id]=[]);for(const a of g.getTracks())l[g.id].push(k.addTrack(a,g))}b&&k.createOffer().then(e).catch(f)}function c(b){l[b.streams[0].id]=b.transceiver,a.onstream(b.streams[0])}function d(b){null!=b.candidate&&a.ondata({ty:2,data:b.candidate})}function e(b){k.setLocalDescription(b).then(function(){a.ondata({ty:1,data:k.localDescription})}).catch(f)}function f(a){console.log(a)}function g(c){if(k||b(!1),1==c.ty)k.setRemoteDescription(new RTCSessionDescription(c.data)).then(function(){"offer"==c.data.type&&k.createAnswer().then(e).catch(f)}).catch(f);else if(2==c.ty){var d=new RTCIceCandidate(c.data);k.addIceCandidate(d).catch(f)}else 3==c.ty?h():4==c.ty&&c.id?(j(c.id),a.onremovestream&&a.onremovestream(c.id)):5==c.ty&&(h(!0),a.stream&&b(!0))}function h(b){k&&(Object.keys(l).forEach(j),m=[],k.close(),k=void 0,!0!=b&&a.onclose&&a.onclose(!0))}function i(a){if(!k)return void m.push(a);l[a.id]||(l[a.id]=[]);for(const b of a.getTracks())try{l[a.id].push(k.addTrack(b,a))}catch(a){}m.push(a),k.createOffer().then(e).catch(f)}function j(b){if(k&&b in l){if("stop"in l[b])l[b].stop();else try{for(const c of l[b])a.autoClose&&"stop"in c.track&&c.track.stop(),k.removeTrack(c)}catch(a){console.log(a)}delete l[b]}}var k,l={},m=null==a.stream?[]:Array.isArray(a.stream)?a.stream:[a.stream];return a.autoClose||(a.autoClose=!0),{setData:g,stop:function(b=!0){h(!0),a.ondata({ty:3})},addStream:i,removeStream:function(b){j(b),a.ondata({ty:4,id:b})},start:function(){b(!0)}}}

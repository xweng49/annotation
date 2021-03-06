import { faBoxes } from '@fortawesome/free-solid-svg-icons'
import { CheckBoxTwoTone } from '@material-ui/icons'
import React, { useEffect, useRef, useState } from 'react'

const Canvas = props => {
  
    const canvasRef = useRef(null)
    const [points, changePoints] = useState([])
    const [mode, setMode] = useState(props.mode)
    let ctx = null
    var lastX=null
    var lastY=null
    var img = null
    var dragStart,dragged
    var scaleFactor = null
    if (mode != props.mode) {
      console.log("mode is: " + props.mode)
      setMode(props.mode)
    }


    function redraw() {
      var p1 = ctx.transformedPoint(0,0);
			var p2 = ctx.transformedPoint(canvasRef.current.width,canvasRef.current.height);
      ctx.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);
      ctx.drawImage(img, 0, 0)
    }
    
    var zoom = function(clicks){
      var pt = ctx.transformedPoint(lastX,lastY);
      ctx.translate(pt.x,pt.y);
      var factor = Math.pow(scaleFactor,clicks);
      ctx.scale(factor,factor);
      ctx.translate(-pt.x,-pt.y);
      redraw();
    }

    function trackTransforms(ctx){
      var svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
      var xform = svg.createSVGMatrix();
      ctx.getTransform = function(){ return xform; };
      
      var savedTransforms = [];
      var save = ctx.save;
      ctx.save = function(){
        savedTransforms.push(xform.translate(0,0));
        return save.call(ctx);
      };
      var restore = ctx.restore;
      ctx.restore = function(){
        xform = savedTransforms.pop();
        return restore.call(ctx);
      };
  
      var scale = ctx.scale;
      ctx.scale = function(sx,sy){
        xform = xform.scaleNonUniform(sx,sy);
        return scale.call(ctx,sx,sy);
      };
      var rotate = ctx.rotate;
      ctx.rotate = function(radians){
        xform = xform.rotate(radians*180/Math.PI);
        return rotate.call(ctx,radians);
      };
      var translate = ctx.translate;
      ctx.translate = function(dx,dy){
        xform = xform.translate(dx,dy);
        return translate.call(ctx,dx,dy);
      };
      var transform = ctx.transform;
      ctx.transform = function(a,b,c,d,e,f){
        var m2 = svg.createSVGMatrix();
        m2.a=a; m2.b=b; m2.c=c; m2.d=d; m2.e=e; m2.f=f;
        xform = xform.multiply(m2);
        return transform.call(ctx,a,b,c,d,e,f);
      };
      var setTransform = ctx.setTransform;
      ctx.setTransform = function(a,b,c,d,e,f){
        xform.a = a;
        xform.b = b;
        xform.c = c;
        xform.d = d;
        xform.e = e;
        xform.f = f;
        return setTransform.call(ctx,a,b,c,d,e,f);
      };
      var pt  = svg.createSVGPoint();
      ctx.transformedPoint = function(x,y){
        pt.x=x; pt.y=y;
        return pt.matrixTransform(xform.inverse());
      }
    }
    
    function mousedown(evt) {
      document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
      lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
      lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
      dragStart = ctx.transformedPoint(lastX,lastY);
      dragged = false;
    }
    function mousemove(evt) {
      lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
      lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
      dragged = true;
      if (dragStart){
        var pt = ctx.transformedPoint(lastX,lastY);
        ctx.translate(pt.x-dragStart.x,pt.y-dragStart.y);
        redraw();
      }
    }
    function mouseup(evt) {
      dragStart = null;
      if (!dragged) zoom(evt.shiftKey ? -1 : 1 );
    }
    var handleScroll = function(evt){
      var delta = evt.wheelDelta ? evt.wheelDelta/40 : evt.detail ? -evt.detail : 0;
      if (delta) zoom(delta);
      return evt.preventDefault() && false;
    };

    var panEventListener = function(canvas, mode) {
      if (mode == "pan") {
        console.log('turning on')
        canvas.addEventListener('mousedown', mousedown, false);
        canvas.addEventListener('mousemove', mousemove,false);
        canvas.addEventListener('mouseup', mouseup,false);
        scaleFactor = 1.1;
        canvas.addEventListener('DOMMouseScroll',handleScroll,false);
        canvas.addEventListener('mousewheel',handleScroll,false);
      }
      else {
        console.log('turning off')
        canvas.removeEventListener('mousedown', mousedown, false);
        canvas.removeEventListener('mousemove', mousemove, false);
        canvas.removeEventListener('mouseup', mouseup, false);
        canvas.removeEventListener('DOMMouseScroll',handleScroll, false);
        canvas.removeEventListener('mousewheel',handleScroll, false);
      }
    }

    
    useEffect(() => {
        const canvas = canvasRef.current
        canvas.width = 800
        canvas.height = 600
        lastX=canvas.width/2, lastY=canvas.height/2
        console.log('test')

        img = new Image()
        img.src = props.image_path
        ctx = canvas.getContext('2d')
        trackTransforms(ctx)
        img.onload = () => {
          console.log(props)
          ctx.setTransform(1,0,0,1,0,0)
          ctx.clearRect(0,0,canvas.width, canvas.height)
          ctx.drawImage(img, 0, 0)
        }
        console.log("oneffect")
        // panEventListener(canvas, props.mode)
        if (mode == "pan") {
          console.log('turning on')
          canvas.addEventListener('mousedown', mousedown, false);
          canvas.addEventListener('mousemove', mousemove,false);
          canvas.addEventListener('mouseup', mouseup,false);
          scaleFactor = 1.1;
          canvas.addEventListener('DOMMouseScroll',handleScroll,false);
          canvas.addEventListener('mousewheel',handleScroll,false);
        }
        //   canvas.addEventListener('mousedown',function(evt){
        //     document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
        //     lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
        //     lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
        //     dragStart = ctx.transformedPoint(lastX,lastY);
        //     dragged = false;
        //   },false);
        //   canvas.addEventListener('mousemove',function(evt){
        //     lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
        //     lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
        //     dragged = true;
        //     if (dragStart){
        //       var pt = ctx.transformedPoint(lastX,lastY);
        //       ctx.translate(pt.x-dragStart.x,pt.y-dragStart.y);
        //       redraw();
        //     }
        //   },false);
        //   canvas.addEventListener('mouseup',function(evt){
        //     dragStart = null;
        //     if (!dragged) zoom(evt.shiftKey ? -1 : 1 );
        //   },false);
        //   scaleFactor = 1.1;

        //   var handleScroll = function(evt){
        //     var delta = evt.wheelDelta ? evt.wheelDelta/40 : evt.detail ? -evt.detail : 0;
        //     if (delta) zoom(delta);
        //     return evt.preventDefault() && false;
        //   };
        //   canvas.addEventListener('DOMMouseScroll',handleScroll,false);
        //   canvas.addEventListener('mousewheel',handleScroll,false);
        // }

        return function cleanup() {
          console.log('turning off')
          canvas.removeEventListener('mousedown', mousedown, false);
          canvas.removeEventListener('mousemove', mousemove, false);
          canvas.removeEventListener('mouseup', mouseup, false);
          canvas.removeEventListener('DOMMouseScroll',handleScroll, false);
          canvas.removeEventListener('mousewheel',handleScroll, false);
        }
    }, [props.image_path, props.mode])
    return <canvas ref={canvasRef} {...props}/>
}

export default Canvas
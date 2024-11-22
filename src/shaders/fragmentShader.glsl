uniform float uTime;
varying vec2 vUv;

void main(){
    float pulse=.5+.5*sin(uTime+vUv.x*10.);
    gl_FragColor=vec4(vUv,pulse,1.);
}

uniform float uTime;          // Time uniform (updated in React Three Fiber)
uniform vec2 uResolution;     // Resolution uniform (updated in React Three Fiber)
varying vec2 vUv;             // UV passed from the vertex shader

// Random function (used for noise generation)
float rand(vec2 n) { 
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

// Simple 2D noise function (more detailed)
float noise(vec2 p){
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u*u*(3.0-2.0*u);

    float res = mix(
        mix(rand(ip), rand(ip+vec2(1.0,0.0)), u.x),
        mix(rand(ip+vec2(0.0,1.0)), rand(ip+vec2(1.0,1.0)), u.x), u.y);
    return res * res;
}

// fBm function (Fractal Brownian Motion with scale adjustments)
const mat2 mtx = mat2( 0.80,  0.60, -0.60,  0.80 );

float fbm(vec2 p) {
    float f = 0.0;

    f += 0.500000 * noise(p * 3.0 + uTime); p = mtx * p * 2.02;
    f += 0.031250 * noise(p * 3.0); p = mtx * p * 2.01;
    f += 0.250000 * noise(p * 3.0); p = mtx * p * 2.03;
    f += 0.125000 * noise(p * 3.0); p = mtx * p * 2.01;
    f += 0.062500 * noise(p * 3.0); p = mtx * p * 2.04;
    f += 0.015625 * noise(p * 3.0 + sin(uTime));
    
    return f / 0.96875;
}

// Pattern generation using fBm
float pattern(vec2 p) {
    return fbm(p + fbm(p + fbm(p)));
}

// Main fragment shader logic
void main() {
    vec2 uv = vUv * 2.0 - 1.0; // Map UVs to range [-1, 1]
    uv.x *= uResolution.x / uResolution.y;  // Aspect correction
    
    // Scale the pattern for more detail
    float shade = pattern(uv * 0.5);  // Increase scale for detail

    // Map the pattern value to grayscale (0.0 to 1.0)
    float grayscale = shade * 0.1 + 0.;  // Map to [0.0, 1.0]

    // Output final color as grayscale
    gl_FragColor = vec4(vec3(grayscale), 1.0);
}

varying vec2 vUv;

void main() {
    vUv = uv;  // Pass UV coordinates to the fragment shader
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    gl_Position = projectionPosition;
}

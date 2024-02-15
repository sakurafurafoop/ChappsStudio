#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTexCoord;
uniform sampler2D tex0;
uniform sampler2D tex1;

void main(){
    vec2 uv = vTexCoord;
    uv.y = 1.0 - uv.y;
    vec4 tex0 = texture2D(tex0, uv);
    vec4 tex1 = texture2D(tex1, uv);

    vec4 mixedTex = mix(tex0, tex1, 0.5);
    gl_FragColor = mixedTex;
}
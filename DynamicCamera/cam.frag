#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTexCoord;
uniform sampler2D tex;

void main(){
    vec2 uv = vTexCoord;
    uv.y = 1.0 - uv.y;
    vec4 tex = texture2D(tex, uv);
    gl_FragColor = tex;
}
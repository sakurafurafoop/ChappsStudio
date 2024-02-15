#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTexCoord;
uniform sampler2D tex0;
uniform sampler2D tex1;
uniform sampler2D tex2;
uniform sampler2D tex3;
uniform sampler2D tex4;
uniform int frames;

void main(){
    vec2 uv = vTexCoord;
    uv.y = 1.0 - uv.y;
    vec4 mixedTex;
    float weight = 0.2;
    vec4 tex0 = texture2D(tex0, uv) * weight;
    vec4 tex1 = texture2D(tex1, uv) * weight;
    vec4 tex2 = texture2D(tex2, uv) * weight;
    vec4 tex3 = texture2D(tex3, uv) * weight;
    vec4 tex4 = texture2D(tex4, uv) * weight;
    mixedTex = tex0 + tex1 + tex2 + tex3 + tex4;
    gl_FragColor = mixedTex;
}
attribute vec3 aPosition; // 頂点の位置情報
attribute vec2 aTexCoord; // テクスチャの座標情報

varying vec2 vTexCoord;

void main(){
    vTexCoord = aTexCoord;

    vec4 positionVec4 = vec4(aPosition, 1.0);
    positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
    gl_Position = positionVec4;
}


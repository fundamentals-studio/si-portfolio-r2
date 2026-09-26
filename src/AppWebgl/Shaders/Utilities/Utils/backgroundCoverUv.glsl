/*------------------------------
Background Cover UV
------------------------------*/
vec2 backgroundCoverUv(vec2 uv, vec2 textureSize, vec2 planeSize, float scaler){

    vec2 center = vec2(0.5);
    vec2 newUv = (uv - center) * scaler;

    float textureAspect = textureSize.x / textureSize.y;
    float planeAspect = planeSize.x / planeSize.y;

    if(planeAspect < textureAspect){
        newUv *= vec2(planeAspect / textureAspect, 1.0);
    } else {
        newUv *= vec2(1.0, textureAspect / planeAspect);
    }

    return newUv += center;
}
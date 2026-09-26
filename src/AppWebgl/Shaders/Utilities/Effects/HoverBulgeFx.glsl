/*------------------------------
Hover Bulge Fx
------------------------------*/
vec2 HoverBulgeFx(vec2 uv, vec2 hoverUv, float strength, float amplitude, float activator){

    float distanceToCenter = distance(uv, hoverUv);
    float distanceClamp = clamp(1.0 - distanceToCenter * strength, 0.0, 1.0);
    vec2 fx = 50.0 * (sin(uv) * distanceClamp / 300.0 * (hoverUv.x + hoverUv.y) * amplitude * activator);

    return fx;
}

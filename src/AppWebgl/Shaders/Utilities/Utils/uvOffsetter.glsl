/*------------------------------
UV Offsetter
------------------------------*/
float uvOffsetter(float uvAxis, vec2 vUv, vec2 hoverUv, float frequency, float strength, float amplitude, float activator, float uTime){

    float PI = 3.14159265359;
    float hoverDistanceToCenter = distance(vUv, hoverUv);
    float hoverDistanceClamp = clamp(1.0 - hoverDistanceToCenter * strength, 0.0, 1.0);

    return sin(frequency * uvAxis + uTime * PI) * hoverDistanceClamp / 500.0 * (hoverUv.x + hoverUv.y) * amplitude * activator;

}
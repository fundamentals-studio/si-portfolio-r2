/*------------------------------
Wave Transition Fx
------------------------------*/
float WaveTransitionFx(vec2 uv, float distort, float frequency, float amplitude, float multiplier, float time, float activator, bool isHover){

    float PI = 3.14159265359;
    float distanceToCenter = 0.0;

    if(isHover){

        distanceToCenter = 0.9 * distance(uv, vec2(0.5));

    } else {

        distanceToCenter = distance(uv, vec2(-0.2, 1.2)) + distance(uv, vec2(1.2, 1.2));
        distanceToCenter *= 0.1 * distance(uv, vec2(0.5, 2.0));

    }

    float progress = sin(PI * activator);
    float wave = progress * multiplier * sin(frequency * sin(frequency * distanceToCenter) + amplitude * time);
    float fx = wave;

    return fx;

}
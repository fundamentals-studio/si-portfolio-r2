/*------------------------------
Bulge
------------------------------*/
float BulgeFx2(vec2 normalizedScreenResolution, float frequency, float amplitude, float shift, float activator){

    // default shift = 0.45;
    // default frequency = 0.3;
    // default amplitude = 55.0;

    float PI = 3.14159265359;
    float positionX = normalizedScreenResolution.x - 0.5;
    float bend = 1.0 - pow(abs(5.0 * sin(PI * positionX * frequency + shift) * 0.6), 2.5) * 3.0;
    float range = smoothstep(0.0, 3.0, bend);
    float fx = amplitude * range * activator;
    
    return fx;
}
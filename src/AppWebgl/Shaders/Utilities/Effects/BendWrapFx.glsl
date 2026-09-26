/*------------------------------
Bend Wrap FX
------------------------------*/
float BendWrapFx(vec4 modelPosition, vec2 normalizedScreenPosition, float frequency, float strength, float shift){

    float PI = 3.14159265359;
    float positionX = normalizedScreenPosition.x - 0.5;
    float bend = 1.0 - pow(abs(5.0 * sin(PI * positionX * frequency + shift) * 0.6), 2.5) * 3.0;
    float fx = sin((modelPosition.z)) + (bend * strength);
    
    return fx;
}




// float PI = 3.14159265359;
// float radius = 0.5;
// float positionX = normalizedScreenPosition.y - 0.5;
// float bend = pow(abs(8.0 * sin(PI * positionX * frequency + shift) * radius), 2.5) * 1.0;
// float fx = sin((modelPosition.z)) + (bend * strength);
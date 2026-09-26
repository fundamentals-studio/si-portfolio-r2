/*------------------------------
Bulge Fx3
------------------------------*/
float radius = 1.0;
float strength = 0.5;

vec2 BulgeFx3(vec2 uv, vec2 mouseCoord, float amount){
    uv -= mouseCoord;

    float distanceToCenter = length(uv) / radius;
    float powerDist = pow(distanceToCenter, amount);
    float strongDist = strength * (1.0 + powerDist);

    uv *= strongDist;
    uv += mouseCoord;

    return uv;
}
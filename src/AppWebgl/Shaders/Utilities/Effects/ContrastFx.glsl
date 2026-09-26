/*------------------------------
Contrast
------------------------------*/
vec3 ContrastFx(vec3 texture, float amount){
    
    float midpoint = 0.5;
    return (texture - midpoint) * amount + midpoint;

}
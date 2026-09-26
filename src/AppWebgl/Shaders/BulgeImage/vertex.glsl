/*------------------------------
Inlcudes
------------------------------*/
#include ../Utilities/Effects/BulgeFx.glsl
#include ../Utilities/Effects/BendWrapFx.glsl


/*------------------------------
Uniforms
------------------------------*/
uniform float uTime;
uniform float uBend;
uniform vec2 uResolution;
uniform bool uExcludeFromDeformation;

/*------------------------------
Varyings
------------------------------*/
varying vec2 vUv;
varying float vWabble;


/*------------------------------
 
Main
 
------------------------------*/
void main(){

    /*------------------------------
    Positioning
    ------------------------------*/
    vec2 center = vec2(0.5);
    vec3 newPosition = position;
    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec2 normalizedScreenResolution = modelPosition.xy / uResolution;
    float distToCenter = distance(uv, center);


    /*------------------------------
    Fx
    ------------------------------*/
    float bulge = BulgeFx(normalizedScreenResolution.y, 0.1, 34.0, 0.45, uBend);
    bulge -= BulgeFx(normalizedScreenResolution.x, 0.1, 55.0, 0.45, uBend);

    float bendWrap = BendWrapFx(modelPosition, normalizedScreenResolution, 0.3, 5.0, 0.45);

    float inverseBendWrap = 1.0 - bendWrap;
    float finalBend = inverseBendWrap * 0.7;
    float wabble = 0.8 * sin(2.0 * bulge + distToCenter);
    
    
    if(!uExcludeFromDeformation){

        modelPosition.z += finalBend;
        modelPosition.z += wabble;      

    }


    /*------------------------------
    Final
    ------------------------------*/
    gl_Position = projectionMatrix * viewMatrix * modelPosition;
    

    /*------------------------------
    Varyings
    ------------------------------*/
    vUv = uv;
    vWabble = wabble;
    
}

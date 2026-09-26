/*------------------------------
Inlcudes
------------------------------*/
#include ../Utilities/Effects/BulgeFx2.glsl
#include ../Utilities/Effects/BendWrapFx.glsl
#include ../Utilities/Effects/HoverBulgeFx.glsl
#include ../Utilities/Effects/WaveTransitionFx.glsl


/*------------------------------
Uniforms
------------------------------*/
uniform float uTime;
uniform float uBend;
uniform float uHovering;
uniform float uPIscaler;
uniform float uAmplitude;
uniform float uFrequency;
uniform float uActivate;

uniform vec2 uHoverUv;
uniform vec2 uResolution;

/*------------------------------
Varyings
------------------------------*/
varying vec2 vUv;
varying vec3 vNormal;
varying float vWaves;
varying float vBulgeFx;
varying vec2 vPlaneSize;
varying vec3 vNormalMatcap;


/*------------------------------
 
Main
 
------------------------------*/
void main(){

    /*------------------------------
    Positioning
    ------------------------------*/
    float PI = 3.14159265359;
    vec2 center = vec2(0.5);

    vec3 newPosition = position;
    newPosition.z = newPosition.z + sin(uTime * PI + position.y * 2.0) * 0.5 * uHovering;

    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec2 normalizedScreenResolution = modelPosition.xy / uResolution;
    
    /*------------------------------
    Fx
    ------------------------------*/
    float distort = distance(uv, vec2(newPosition.x, newPosition.y));

    float bulge = BulgeFx2(normalizedScreenResolution, 0.3, 55.0, 0.45, uBend);
    float bendWrap = BendWrapFx(modelPosition, normalizedScreenResolution, 0.3, 5.0, 0.45);
    float hoverWave = WaveTransitionFx(newPosition.yx, distort, 5.0, 19.0, 0.4, uTime, uHovering, true);
    vec2 hoverBulge = HoverBulgeFx(newPosition.yx, uHoverUv, 2.0, 8.0, uHovering);

    modelPosition.z += hoverBulge.x + hoverBulge.y;
    modelPosition.z += bendWrap * uActivate;
    modelPosition.z += bendWrap * (hoverWave * 0.1);
    modelPosition.z += 5.0 * uHovering;

    /*------------------------------
    Final
    ------------------------------*/
    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;
    

    /*------------------------------
    Varyings
    ------------------------------*/
    vUv = uv;
    vNormal = normal;
    vBulgeFx = bulge;
    vNormalMatcap = normalize(normalMatrix * normal);

}

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
uniform float uTransition;
uniform float uActivate;
uniform float uPushBack;

uniform vec2 uHoverUv;
uniform vec2 uPlaneSize;
uniform vec2 uResolution;

/*------------------------------
Varyings
------------------------------*/
varying vec2 vUv;
varying vec2 vHoverBulge;
varying vec2 vPlaneSize;

varying vec3 vNormal;
varying vec3 vNormalMatcap;

varying float vBulgeFx;
varying float vTransitionWave;


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

    vec4 defaultState = modelMatrix * vec4(newPosition, 1.0);
    vec2 normalizedScreenResolution = defaultState.xy / uResolution;
    vec4 fullscreenState = vec4(newPosition, 1.0);

    fullscreenState.x *= uResolution.x;
    fullscreenState.y *= uResolution.y;

    
    /*------------------------------
    Fx
    ------------------------------*/
    float distort = distance(uv, vec2(newPosition.x, newPosition.y));
    float bulge = BulgeFx2(normalizedScreenResolution, 0.3, 55.0, 0.45, uBend);
    float bendWrap = BendWrapFx(defaultState, normalizedScreenResolution, 0.3, 5.0, 0.45);
    float transitionWave = WaveTransitionFx(newPosition.xy, distort, 5.0, 13.0, 0.15, uTime, uTransition, false);
    float hoverWave = WaveTransitionFx(newPosition.yx, distort, 5.0, 19.0, 0.4, uTime, uHovering, true);


    defaultState.z += bendWrap * uActivate;
    defaultState.z += bendWrap * (hoverWave * 0.1);
    defaultState.z += 5.0 * uHovering;
    defaultState.z -= 144.0 * uPushBack;


    /*------------------------------
    Final
    ------------------------------*/
    vec4 finalState = mix(defaultState, fullscreenState, transitionWave + uTransition);
    vec4 viewPosition = viewMatrix * finalState;
    gl_Position = projectionMatrix * viewPosition;
    

    /*------------------------------
    Varyings
    ------------------------------*/
    vUv = uv;
    vNormal = normal;
    vBulgeFx = bulge;
    vTransitionWave = (transitionWave * 0.7) + (hoverWave * 0.1);
    vPlaneSize = mix(uPlaneSize, uResolution, uTransition);
    vNormalMatcap = normalize(normalMatrix * normal);

}

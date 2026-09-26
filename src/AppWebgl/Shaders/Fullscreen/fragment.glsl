/*------------------------------
Includes
------------------------------*/
#include ../Utilities/Effects/BulgeFx3.glsl
#include ../Utilities/Effects/ContrastFx.glsl
#include ../Utilities/Utils/uvOffsetter.glsl
#include ../Utilities/Utils/backgroundCoverUv.glsl
#include ../Utilities/Effects/PixelatedImageFx.glsl
#include ../Utilities/Effects/GreyscaleImageFx.glsl

/*------------------------------
Uniforms
------------------------------*/
uniform float uTime;
uniform float uZoom;
uniform float uBend;
uniform float uAlpha;
uniform float uHovering;
uniform float uProgress;
uniform float uTransition;
uniform float uIsColouredImage;

uniform vec2 uHoverUv;
uniform vec2 uResolution;
uniform vec2 uTextureSize;
uniform sampler2D uTexture;

/*------------------------------
Varyings
------------------------------*/
varying vec2 vUv;
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
    New Uv
    ------------------------------*/
    float PI = 3.14159265359;
    vec2 buldgeUv = BulgeFx3(vUv, uHoverUv, 0.3);
    vec2 finalFxUv = mix(vUv, buldgeUv, uHovering);

    vec2 newUv = backgroundCoverUv(finalFxUv, uTextureSize, vPlaneSize, uZoom);
    vec2 uv = newUv;

    /*------------------------------
    New UV Offsetted
    ------------------------------*/
    float strength = 3.0;
    float frequency = 5.0;
    float amplitude = 13.0;

    newUv.x -= uvOffsetter(newUv.y, vUv, uHoverUv, frequency, strength, amplitude, uHovering + vTransitionWave, uTime);
    newUv.y -= uvOffsetter(newUv.x, vUv, uHoverUv, frequency, strength, amplitude, uHovering + vTransitionWave, uTime);

    /*------------------------------
    Colour RGB
    ------------------------------*/
    vec3 sampledImage = vec3(0.0);
    sampledImage.r = texture(uTexture, newUv).r;
    sampledImage.gb = texture(uTexture, uv).gb;


    /*------------------------------
    Grey Images
    ------------------------------*/
    vec3 greyImage = GreyscaleImageFx(sampledImage);
    vec3 invertedGreyImage = 1.0 - greyImage;

    /*------------------------------
    Mixers
    ------------------------------*/
    float shine = vBulgeFx * 0.07;
    float mixer = uHovering + uProgress + uTransition;


    /*------------------------------
    Last Sample
    ------------------------------*/
    vec3 differenceImage = pow(abs(invertedGreyImage - greyImage), vec3(1.0));
    vec3 lastSample = mix(differenceImage, sampledImage, shine + mixer);


    /*------------------------------
    Highlight
    ------------------------------*/
    float highlight = 1.0 - distance(uv, uHoverUv);
    float highlightClamped = 0.3 * smoothstep(0.7, 1.0, highlight);


    /*------------------------------
    Rendered Image
    ------------------------------*/
    vec3 renderedImage = vec3(0.0);

    if (abs(1.0 - vNormal.z) < 0.001) {
        renderedImage = lastSample;
    } else {
        renderedImage = vec3(0.878);
    }
    

    /*------------------------------
    Final
    ------------------------------*/
    gl_FragColor = vec4(renderedImage, uAlpha);
    gl_FragColor.rgb += 3.0 * vec3(vTransitionWave) + (highlightClamped * uHovering);
  
}
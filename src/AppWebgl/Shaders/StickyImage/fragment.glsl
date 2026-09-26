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
uniform float uTransition;
uniform float uFirstImageToGrey;

uniform vec2 uHoverUv;
uniform vec2 uPlaneSize;
uniform vec2 uResolution;
uniform vec2 uTextureSize;

uniform sampler2D uMatcap;
uniform sampler2D uTexture;

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
    New Uv
    ------------------------------*/
    float PI = 3.14159265359;
    vec2 buldgeUv = BulgeFx3(vUv, uHoverUv, 0.3);
    vec2 finalFxUv = mix(vUv, buldgeUv, uHovering);

    vec2 newUv = backgroundCoverUv(finalFxUv, uTextureSize, uPlaneSize, uZoom);
    vec2 uv = newUv;

    /*------------------------------
    New UV Offsetted
    ------------------------------*/
    float strength = 3.0;
    float frequency = 5.0;
    float amplitude = 13.0;

    newUv.x -= uvOffsetter(newUv.y, vUv, uHoverUv, frequency, strength, amplitude, uHovering, uTime);
    newUv.y -= uvOffsetter(newUv.x, vUv, uHoverUv, frequency, strength, amplitude, uHovering, uTime);

    /*------------------------------
    Colour RGB
    ------------------------------*/ 
    vec3 sampledImage1 = vec3(0.0);
    sampledImage1.r = texture(uTexture, newUv).r;
    sampledImage1.g = texture(uTexture, uv).g;
    sampledImage1.b = texture(uTexture, uv).b;


    /*------------------------------
    Final Image 1
    ------------------------------*/
    float contrastAmount = 1.3;
    float saturation = 1.0 * uFirstImageToGrey;
    vec3 greyscaleImage = GreyscaleImageFx(sampledImage1);

    vec3 finalImage1 = vec3(0.0);
    finalImage1 = sampledImage1;
    finalImage1 = mix(greyscaleImage, finalImage1, saturation);


    /*------------------------------
    Sample Image 2
    ------------------------------*/
    float chromaticAmount = 13.0;
    float distanceToCenter = 5.0 * distance(uv, vec2(0.5));

    vec2 pixel = 1.0 / uResolution;
    vec2 chromaticOffset = (newUv * chromaticAmount) * distanceToCenter;

    vec3 sampledImage2 = vec3(0.0);
    sampledImage2.r = texture(uTexture, newUv + chromaticOffset).r;
    sampledImage2.b = texture(uTexture, uv).b;
    sampledImage2.g = texture(uTexture, uv).g;


    /*------------------------------
    Final Image 2
    ------------------------------*/
    float shine = vBulgeFx * 0.08; 
    vec3 greyImage2 = 1.0 - texture(uTexture, newUv).rrr;

    vec3 finalImage2 = vec3(0.0);
    finalImage2 = mix(vec3(0.8) * greyImage2, sampledImage2, shine);


    /*------------------------------
    Rendered Image
    ------------------------------*/
    float mixer =  vBulgeFx * 0.02;
    vec3 renderedImage = vec3(0.0);


    if (abs(1.0 - vNormal.z) < 0.001) {

        renderedImage = mix(finalImage1, vec3(1.0) * finalImage2, mixer);

    } else {

        vec2 normalUv = abs(vNormalMatcap.xy) / 2.0 + 0.5;
        vec3 matcapTexure = texture(uMatcap, normalUv).rgb;
        renderedImage = pow(matcapTexure, vec3(2.2));

    }


    /*------------------------------
    Final
    ------------------------------*/
    gl_FragColor = vec4(renderedImage, uAlpha);
  
}
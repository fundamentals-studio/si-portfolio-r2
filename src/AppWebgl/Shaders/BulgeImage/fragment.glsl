/*------------------------------
Includes
------------------------------*/
#include ../Utilities/Utils/uvOffsetter.glsl
#include ../Utilities/Utils/backgroundCoverUv.glsl
#include ../Utilities/Effects/GreyscaleImageFx.glsl

/*------------------------------
Uniforms
------------------------------*/
uniform float uTime;
uniform float uZoom;
uniform float uAlpha;

uniform vec2 uPlaneSize;
uniform vec2 uResolution;
uniform vec2 uTextureSize;
uniform sampler2D uTexture;

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
    New Uv
    ------------------------------*/
    float PI = 3.14159265359;
    vec2 newUv = backgroundCoverUv(vUv, uTextureSize, uPlaneSize, uZoom);
    vec2 pixel = 1.0 / gl_FragCoord.xy;

    /*------------------------------
    Distance & Chroma
    ------------------------------*/
    float distToCenter = distance(newUv, vec2(0.5));
    vec2 offset = pixel * 0.5;
    offset *= distToCenter * 5.0 * vWabble;


    /*------------------------------
    Final Image
    ------------------------------*/
    float red = texture(uTexture, newUv + offset).r;
    float green = texture(uTexture, newUv).g;
    float blue = texture(uTexture, newUv).b;

    vec3 finalImage = vec3(red, green, blue);

    
    /*------------------------------
    Final
    ------------------------------*/
    gl_FragColor = vec4(finalImage, uAlpha);
    gl_FragColor.rgb += 0.13 * vec3(vWabble);
  
}
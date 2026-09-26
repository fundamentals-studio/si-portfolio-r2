/*------------------------------
Pixelated Image
------------------------------*/
vec3 PixelatedImageFx(vec2 size, vec2 uv, sampler2D imageTexture){

    vec2 pixelUv = floor(uv * size) / size;
    vec3 pixelatedImage = texture(imageTexture, pixelUv).rgb;

    return pixelatedImage;

}
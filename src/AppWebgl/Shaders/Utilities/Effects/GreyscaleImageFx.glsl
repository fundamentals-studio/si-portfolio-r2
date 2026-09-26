/*------------------------------
Greyscale Image Fx
------------------------------*/
vec3 GreyscaleImageFx(vec3 imageTexture){

    vec3 greyScale = vec3(0.2126, 0.7152, 0.0722);
    vec3 greyscaleImage = vec3(dot(imageTexture, greyScale));

    return greyscaleImage;
}
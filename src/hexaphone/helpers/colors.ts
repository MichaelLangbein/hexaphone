import * as convert from 'color-convert';

// https://paletton.com/#uid=3040u0kllllaFw0g0qFqFg0w0aF

export const primaryColorHex = {
    'shade0': '#AA4339',  // = rgb(170, 67, 57) = rgba(170, 67, 57,1) = rgb0(0.667,0.263,0.224)
    'shade1': '#FFB2AA',  // = rgb(255,178,170) = rgba(255,178,170,1) = rgb0(1,0.698,0.667)
    'shade2': '#D4746A',  // = rgb(212,116,106) = rgba(212,116,106,1) = rgb0(0.831,0.455,0.416)
    'shade3': '#801F15',  // = rgb(128, 31, 21) = rgba(128, 31, 21,1) = rgb0(0.502,0.122,0.082)
    'shade4': '#550800',  // = rgb( 85,  8,  0) = rgba( 85,  8,  0,1) = rgb0(0.333,0.031,0)
}


export const secondaryColor1Hex = {
    'shade0': '#255E69', // = rgb( 37, 94,105) = rgba( 37, 94,105,1) = rgb0(0.145,0.369,0.412)
    'shade1': '#6A959D', // = rgb(106,149,157) = rgba(106,149,157,1) = rgb0(0.416,0.584,0.616)
    'shade2': '#437983', // = rgb( 67,121,131) = rgba( 67,121,131,1) = rgb0(0.263,0.475,0.514)
    'shade3': '#0F444F', // = rgb( 15, 68, 79) = rgba( 15, 68, 79,1) = rgb0(0.059,0.267,0.31)
    'shade4': '#012C34', // = rgb(  1, 44, 52) = rgba(  1, 44, 52,1) = rgb0(0.004,0.173,0.204)
}


export const secondaryColor2Hex = {
   'shade0': '#759D34', // = rgb(117,157, 52) = rgba(117,157, 52,1) = rgb0(0.459,0.616,0.204)
   'shade1': '#CEEC9D', // = rgb(206,236,157) = rgba(206,236,157,1) = rgb0(0.808,0.925,0.616)
   'shade2': '#9FC462', // = rgb(159,196, 98) = rgba(159,196, 98,1) = rgb0(0.624,0.769,0.384)
   'shade3': '#507614', // = rgb( 80,118, 20) = rgba( 80,118, 20,1) = rgb0(0.314,0.463,0.078)
   'shade4': '#314F00', // = rgb( 49, 79,  0) = rgba( 49, 79,  0,1) = rgb0(0.192,0.31,0)
};



export const primaryColorHsv = {
    'shade0': convert.hex.hsv(primaryColorHex.shade0),  // = rgb(170, 67, 57) = rgba(170, 67, 57,1) = rgb0(0.667,0.263,0.224)
    'shade1': convert.hex.hsv(primaryColorHex.shade1),  // = rgb(255,178,170) = rgba(255,178,170,1) = rgb0(1,0.698,0.667)
    'shade2': convert.hex.hsv(primaryColorHex.shade2),  // = rgb(212,116,106) = rgba(212,116,106,1) = rgb0(0.831,0.455,0.416)
    'shade3': convert.hex.hsv(primaryColorHex.shade3),  // = rgb(128, 31, 21) = rgba(128, 31, 21,1) = rgb0(0.502,0.122,0.082)
    'shade4': convert.hex.hsv(primaryColorHex.shade4),  // = rgb( 85,  8,  0) = rgba( 85,  8,  0,1) = rgb0(0.333,0.031,0)
}


export const secondaryColor1Hsv = {
    'shade0': convert.hex.hsv(secondaryColor1Hex.shade0), // = rgb( 37, 94,105) = rgba( 37, 94,105,1) = rgb0(0.145,0.369,0.412)
    'shade1': convert.hex.hsv(secondaryColor1Hex.shade1), // = rgb(106,149,157) = rgba(106,149,157,1) = rgb0(0.416,0.584,0.616)
    'shade2': convert.hex.hsv(secondaryColor1Hex.shade2), // = rgb( 67,121,131) = rgba( 67,121,131,1) = rgb0(0.263,0.475,0.514)
    'shade3': convert.hex.hsv(secondaryColor1Hex.shade3), // = rgb( 15, 68, 79) = rgba( 15, 68, 79,1) = rgb0(0.059,0.267,0.31)
    'shade4': convert.hex.hsv(secondaryColor1Hex.shade4), // = rgb(  1, 44, 52) = rgba(  1, 44, 52,1) = rgb0(0.004,0.173,0.204)
}


export const secondaryColor2Hsv = {
   'shade0': convert.hex.hsv(secondaryColor1Hex.shade0), // = rgb(117,157, 52) = rgba(117,157, 52,1) = rgb0(0.459,0.616,0.204)
   'shade1': convert.hex.hsv(secondaryColor1Hex.shade1), // = rgb(206,236,157) = rgba(206,236,157,1) = rgb0(0.808,0.925,0.616)
   'shade2': convert.hex.hsv(secondaryColor1Hex.shade2), // = rgb(159,196, 98) = rgba(159,196, 98,1) = rgb0(0.624,0.769,0.384)
   'shade3': convert.hex.hsv(secondaryColor1Hex.shade3), // = rgb( 80,118, 20) = rgba( 80,118, 20,1) = rgb0(0.314,0.463,0.078)
   'shade4': convert.hex.hsv(secondaryColor1Hex.shade4), // = rgb( 49, 79,  0) = rgba( 49, 79,  0,1) = rgb0(0.192,0.31,0)
};


export const primaryColorRgb = {
    'shade0': convert.hex.rgb(primaryColorHex.shade0),  // = rgb(170, 67, 57) = rgba(170, 67, 57,1) = rgb0(0.667,0.263,0.224)
    'shade1': convert.hex.rgb(primaryColorHex.shade1),  // = rgb(255,178,170) = rgba(255,178,170,1) = rgb0(1,0.698,0.667)
    'shade2': convert.hex.rgb(primaryColorHex.shade2),  // = rgb(212,116,106) = rgba(212,116,106,1) = rgb0(0.831,0.455,0.416)
    'shade3': convert.hex.rgb(primaryColorHex.shade3),  // = rgb(128, 31, 21) = rgba(128, 31, 21,1) = rgb0(0.502,0.122,0.082)
    'shade4': convert.hex.rgb(primaryColorHex.shade4),  // = rgb( 85,  8,  0) = rgba( 85,  8,  0,1) = rgb0(0.333,0.031,0)
}


export const secondaryColor1Rgb = {
    'shade0': convert.hex.rgb(secondaryColor1Hex.shade0), // = rgb( 37, 94,105) = rgba( 37, 94,105,1) = rgb0(0.145,0.369,0.412)
    'shade1': convert.hex.rgb(secondaryColor1Hex.shade1), // = rgb(106,149,157) = rgba(106,149,157,1) = rgb0(0.416,0.584,0.616)
    'shade2': convert.hex.rgb(secondaryColor1Hex.shade2), // = rgb( 67,121,131) = rgba( 67,121,131,1) = rgb0(0.263,0.475,0.514)
    'shade3': convert.hex.rgb(secondaryColor1Hex.shade3), // = rgb( 15, 68, 79) = rgba( 15, 68, 79,1) = rgb0(0.059,0.267,0.31)
    'shade4': convert.hex.rgb(secondaryColor1Hex.shade4), // = rgb(  1, 44, 52) = rgba(  1, 44, 52,1) = rgb0(0.004,0.173,0.204)
}


export const secondaryColor2Rgb = {
   'shade0': convert.hex.rgb(secondaryColor1Hex.shade0), // = rgb(117,157, 52) = rgba(117,157, 52,1) = rgb0(0.459,0.616,0.204)
   'shade1': convert.hex.rgb(secondaryColor1Hex.shade1), // = rgb(206,236,157) = rgba(206,236,157,1) = rgb0(0.808,0.925,0.616)
   'shade2': convert.hex.rgb(secondaryColor1Hex.shade2), // = rgb(159,196, 98) = rgba(159,196, 98,1) = rgb0(0.624,0.769,0.384)
   'shade3': convert.hex.rgb(secondaryColor1Hex.shade3), // = rgb( 80,118, 20) = rgba( 80,118, 20,1) = rgb0(0.314,0.463,0.078)
   'shade4': convert.hex.rgb(secondaryColor1Hex.shade4), // = rgb( 49, 79,  0) = rgba( 49, 79,  0,1) = rgb0(0.192,0.31,0)
};
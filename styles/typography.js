import * as Colors from "./colors"

const textColor = {
    color: Colors.textAccent
}

const defaultStyles = {
    ...textColor,
    fontFamily: "Outfit-Regular",
}

const boldFontStyle = {
    ...textColor,
    fontFamily: "Outfit-Bold"
}

export const title = {
    ...defaultStyles,
    fontSize: 16
}

export const productNameText = {
    ...boldFontStyle,
    fontSize: 15
}

export const productQuantityText = {
    ...defaultStyles,
    fontSize: 11
}

export const productPriceText = {
    ...boldFontStyle,
    fontSize: 20
}

export const buttonText = {
    ...boldFontStyle,
    fontSize: 12
}

export const inputText = {
    ...boldFontStyle,
    fontSize: 15 // Could change to 16-17
}

export const bigTitle = {
    ...boldFontStyle,
    fontSize: 20
}
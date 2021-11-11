function useBase64(img: string){
    let base64Image = ''
    img.includes('data:image/png;base64,') 
        ? base64Image = img
        : base64Image = `data:image/png;base64,${img}`
    
    base64Image = base64Image.trim()

    return base64Image;
}

export default {useBase64}
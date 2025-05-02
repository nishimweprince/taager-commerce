
// CONVERT FILE TO BASE64
export const convertFileToBase64 = (file: File | string | null): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (typeof file === 'string') {
      // FETCH AND CONVERT URL TO BASE64
      fetch(file)
        .then(response => response.blob())
        .then(blob => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onload = () => {
            if (typeof reader.result === 'string') {
              resolve(reader.result);
            } else {
              reject(new Error('Failed to convert URL to base64 string'));
            }
          };
          reader.onerror = (error) => {
            reject(error);
          };
        })
        .catch(error => {
          reject(error);
        });
    } else if (file) {
      // CONVERT FILE TO BASE64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to convert file to base64 string'));
        }
      };
      reader.onerror = (error) => {
        reject(error);
      };
    }
  });
};

// CONVERT BASE64 TO FILE
export const convertBase64ToFile = (base64: string, filename: string): File => {
  return new File([base64], filename, { type: 'image/png' });
};




function updateImage() {
  const imageUrl = document.getElementById('imageUrlInput').value;

  if (imageUrl) {
      const img = document.getElementById('displayImage');
      img.src = imageUrl;
      img.style.display = 'block'; // Display the image
  } else {
      alert('Please provide a valid image URL');
  }
}

// Function to render stars based on rating
  export const renderStars = (rating) => {
    const maxStars = 5
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    const stars = []

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="bx bxs-star star star--full"></i>)
    }

    // Add half star if applicable
    if (hasHalfStar) {
      stars.push(<i key="half" className="bx bxs-star-half star star--half"></i>)
    }

    // Add empty stars to complete 5 stars
    const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="bx bx-star star star--empty"></i>)
    }

    return stars
  }
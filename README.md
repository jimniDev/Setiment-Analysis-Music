# Setiment-Analysis-Music

## Overview

This repository contains the **frontend** implementation of the **Sentiment Analysis Music Recommendation Service**, a web application built with **React**. It allows users to submit diary entries in Korean, view visualizations of their emotional analysis, and explore music recommendations tailored to their mood.

![image](https://github.com/user-attachments/assets/2f38754c-ac94-47be-be0e-fa80873b5a08)

The backend for this project, which processes emotion analysis and retrieves Spotify music recommendations, is hosted in a separate repository: [Sentiment-Analysis-Flask](https://github.com/jimniDev/Setiment-Analysis-Flask).

![image](https://github.com/user-attachments/assets/8d71a3c3-8d66-4baf-a6a0-3f2578715800)

---

## Features

### 1. Emotional Analysis Visualization
- Displays emotion analysis results (Joy, Calm, Surprise, Sadness, Anger, and Hurt) using interactive charts.
- Provides a clear understanding of the user's emotional state through intuitive visualizations.

### 2. Music Recommendations
- Integrates Spotify API to recommend songs based on emotion analysis results.
- Features include:
  - Song playback using embedded Spotify links.
  - Like/dislike functionality for music recommendations.
  - Ability to request additional recommendations.

### 3. Dynamic UI Features
- Extract dominant colors from album artwork to enhance UI aesthetics.
- Simulate LP record rotation animations using CSS.
- Swipeable music recommendation cards using React and JavaScript.

---

## Folder Structure

![image](https://github.com/user-attachments/assets/46f2e3b7-c503-428a-880b-5668c3e5cc64)

---

## Development Process



### User Flow
1. **Write Diary**:
   - Users submit a diary entry in Korean through an intuitive input form.
2. **Emotion Analysis**:
   - The backend processes the diary and returns emotional probabilities.
3. **Visualization**:
   - Interactive charts display the emotional breakdown of the diary entry.
   - ![image](https://github.com/user-attachments/assets/c1e4a837-a443-45e4-8888-1fc560b55505)
4. **Music Recommendations**:
   - Spotify API generates music recommendations based on the detected emotions.
   - Users can play, like/dislike, or swipe through recommendations.

### Key Frontend Features
1. **Album Art Color Extraction**:
   - Extract dominant colors from album art using the HTML Canvas API.
   - Apply extracted colors dynamically to titles and music cards.
   - ![image](https://github.com/user-attachments/assets/00617c1c-b170-4d3b-b225-269e223641ef)
   - ![image](https://github.com/user-attachments/assets/ff2b7357-55ed-4163-802b-a8e2a27ada06)


2. **LP Record Animation**:
   - CSS animations simulate an LP record rotation effect.
   - Rotation continues during music playback.
   - ![image](https://github.com/user-attachments/assets/7187b685-4095-4c1e-b0d6-cd099f220284)


3. **Swipeable Recommendation Cards**:
   - JavaScript and React handle card swipe events.
   - Animations and mouse event listeners ensure smooth user interactions.
   - ![image](https://github.com/user-attachments/assets/3fee8a8f-9c46-42c2-8fc0-62f4ce01c4c7)


---

## Tech Stack

### Frontend
- **React**: Component-based framework for building the user interface.
- **Chart.js**: For interactive data visualizations of emotional analysis results.
- **CSS Animations**: To create dynamic visual effects such as LP rotation.

---

## Prerequisites

### Backend Setup
Ensure the backend service is running locally or hosted. Refer to the backend repository: [Sentiment-Analysis-Flask](https://github.com/jimniDev/Setiment-Analysis-Flask).

---

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/jimniDev/Setiment-Analysis-Music.git
   cd Setiment-Analysis-Music
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and include:
   ```
   REACT_APP_API_BASE_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open the application in your browser:
   ```
   http://localhost:3000
   ```

---

## Results
- **Award Recognition**:
  - This project won the *People’s Choice Award* in the SW-Reskilling @LG Electronics program.

---

## Future Enhancements
1. Enhance swipeable card UI for mobile responsiveness.
2. Expand dynamic UI features with animated feedback for likes/dislikes.
3. Add multilingual diary support and user preferences for improved recommendations.

---

## Contributing
Contributions are welcome! Please create a pull request or open an issue to discuss changes or enhancements.

---

## License
This project is licensed under the [MIT License](LICENSE).

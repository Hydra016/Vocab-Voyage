import axios from 'axios';

export const saveHighScore = async (highScore, userId) => {
    try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.put(
          '/api/users/setHighScore',
          {
            userId,
            highScore
          },
          config
        );
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const updatedUserInfo = { ...userInfo, HighScore: highScore };
        console.log(updatedUserInfo)
        localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
        return updatedUserInfo
      } catch (error) {
        console.log(error);
      }
}
const fs = require('fs')
var users = [...require("../data/json/users")]
var phones = [...require("../data/json/phones")]
var latiLongi = [...require("../data/json/LatitudeAndLongitude")]

const getPhones = index => {
   let phone = phones[index]
   return Object.keys(phone).map(p => phone[p]).filter(n => n !== null)
}

const getRandomDobAndAge = (current, min, max) => {
   let year = Math.floor(Math.random() * (max - min) + min);
   let month = Math.floor(Math.random() * (13 - 1) + 1);
   let day = Math.floor(Math.random() * (31 - 1) + 1);
   return {
      birthDate: `${year}-${month / 10 < 1 ? `0${month}` : month}-${day / 10 < 1 ? `0${day}` : day}`,
      age: current - year
   }
}

const getTime = (min, max) => {
   return Math.floor(Math.random() * (max - min) + min)
}

users = users.map((user, index) => {
   let formatted = {

      name: {
         title: user.title,
         firstName: user.firstName,
         lastName: user.lastName
      },

      userName: user.userName,
      email: user.email,
      gender: user.gender,
      married: user.married,
      password: user.password,
      ...getRandomDobAndAge(2020, 1980, 2008),

      images: {
         profile: user.avatar,
         cover: user.coverImage
      },

      phones: getPhones(index),

      address: {
         streat: user.streat,
         city: user.city,
         countryCode: user.countryCode,
         country: user.country
      },

      geo: {
         ip: user.ipAddress,
         agent: user.userAgent,
         latitude: latiLongi[index].latitude,
         longitude: latiLongi[index].longitude
      },
      createdAt: getTime(883612800000 /** 1998-01-01 */, Date.now()),
      updatedAt: getTime(1514764800000 /**2018-01-01 */, Date.now()),
      lastVisited: getTime(1546300800000 /**2019-01-01 */, Date.now())

   }
   return formatted
})

fs.writeFileSync("fUsers.json", JSON.stringify(users))

//console.log(users)
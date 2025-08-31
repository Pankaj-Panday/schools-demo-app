export async function GET(request) {
  const data = [
    {
      name: "Great Mission Public School",
      address: "Himmatpur",
      city: "Ramnagar",
      state: "Uttarakhand",
      contact: "9760072355",
      image: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Staples_High_School%2C_Westport%2C_CT.jpg",
      email: "greatmissionschool@gmail.com",
      id: 1756633514465,
    },
    {
      name: "Second School",
      address: "some address",
      city: "Delhi",
      state: "Delhi",
      contact: "0123457890",
      image: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Staples_High_School%2C_Westport%2C_CT.jpg",
      email: "pankaj@example.com",
      id: 1756634348952,
    },
  ];

  return Response.json(data);
}

export async function POST(request) {
  console.log(request);
}

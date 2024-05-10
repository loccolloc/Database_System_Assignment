import React from "react";
import Img2 from "../../assets/coffee2.png";
const ServicesData = [
  {
    id: 1,
    img: Img2,
    name: "Espresso",
    description:
      "Dòng sản phẩm Espresso của chúng tôi là sự kết hợp hoàn hảo giữa hương vị đậm đà và cảm giác mạnh mẽ. Mỗi giọt espresso đều là một hành trình tinh tế đưa bạn đến những hương vị sâu lắng của cà phê. Sự lựa chọn hoàn hảo cho những ai yêu thích hương vị cân đối và hấp dẫn.",
    aosDelay: "100",
  },
  {
    id: 2,
    img: Img2,
    name: "Americano",
    description:
      "Với sự kết hợp tinh tế giữa espresso và nước nóng, Americano của chúng tôi mang đến một trải nghiệm cà phê mạnh mẽ nhưng đồng thời cũng mềm mại và dễ uống. Mỗi giọt Americano là sự kết hợp hoàn hảo giữa sự đậm đà và sự mềm mại, tạo nên một ly cà phê đầy sức sống để bạn bắt đầu ngày mới.",
    aosDelay: "300",
  },
  {
    id: 3,
    img: Img2,
    name: "Cappuccino",
    description:
      "Cappuccino của chúng tôi là sự hòa quện tinh tế giữa espresso, sữa và bọt sữa nhẹ nhàng. Với lớp bọt sữa mịn màng phủ lên trên, mỗi giọt cappuccino là một tác phẩm nghệ thuật vừa mềm mại vừa đầy đặn hương vị. Sự lựa chọn lý tưởng cho những ai yêu thích sự hài hòa và sự tinh tế trong mỗi ngụm cà phê",
    aosDelay: "500",
  },
];
const Services = () => {
  return (
    <>
      <span id="services"></span>
      <div className="py-10">
        <div className="container">
          {/* Heading section  */}
          <div className="text-center mb-20">
            <h1 className="text-4xl font-bold font-cursive text-gray-800">
              Best Coffee For You
            </h1>
          </div>

          {/* Services Card section  */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14 md:gap-5 place-items-center">
            {ServicesData.map((service,key) => (
              <div key={key}
                data-aos="fade-up"
                data-aos-delay={service.aosDelay}
                className="rounded-2xl bg-white hover:bg-primary hover:text-white relative shadow-xl duration-high group max-w-[300px]"
              >
                <div className="h-[122px]">
                  <img
                    src={service.img}
                    alt=""
                    className="max-w-[200px] block mx-auto transform -translate-y-14
                  group-hover:scale-105 group-hover:rotate-6 duration-300"
                  />
                </div>
                <div className="p-4 text-center">
                  <div className="w-full "></div>
                  <h1 className="text-xl font-bold">{service.name}</h1>
                  <p className="text-gray-500 group-hover:text-white duration-high text-sm line-clamp-2">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;

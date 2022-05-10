import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import courses from "src/constants/api/courses";
import Youtube from "react-youtube";
import Header from "../parts/Header";
//Pubic image file
import NameTag from "public/images/icon-nametag.svg";
import PlayBack from "public/images/icon-playback.svg";
import Certificate from "public/images/icon-certificate.svg";

import Feature from "src/pages/parts/Details/Feature";
import { CSSTransition } from "react-transition-group";
import CoursePhoto from "src/pages/parts/Details/CoursePhoto";
import RenderPreview from "src/pages/parts/Details/RenderPreview";
import HappyStudent from "src/pages/parts/Details/HappyStudent";

import Footer from "src/pages/parts/Footer";
import fortmatThousand from "src/helpers/fortmatThousand";

function DetailsCourse({ data }) {
  console.log(data);
  const footer = useRef(null);
  const [isSticky, setisSticky] = useState(() => true);

  useEffect(() => {
    const stickyOffsetTop = footer.current.getBoundingClientRect().top;

    const stickyMetaToggler = () => {
      setisSticky(stickyOffsetTop >= window.pageYOffset + window.innerHeight);
    };

    window.addEventListener("scroll", stickyMetaToggler);
    return () => {
      window.removeEventListener("scroll", stickyMetaToggler);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Esploor</title>
      </Head>

      <section
        className="pt-10 relative overflow-hidden"
        style={{ height: 660 }}
      >
        {data?.data?.chapters?.[0]?.lessons?.[0].video && (
          <div className="video-wrapper">
            <Youtube
              videoId={data?.data?.chapters?.[0]?.lessons?.[0].video}
              id={data?.data?.chapters?.[0]?.lessons?.[0].video}
              opts={{
                playerVars: {
                  loop: 1,
                  mute: 1,
                  autoplay: 1,
                  controls: 0,
                  showinfo: 0,
                },
              }}
              onEnd={(event) => {
                event.target.playVideo();
              }}
            ></Youtube>
          </div>
        )}

        <div className="absolute inset-0 z-0 w-full h-full bg-black opacity-25"></div>
        <div className="meta-title absolute inset-0 object-fill z-0 w-full flex justify-center items-center">
          <div className="text-center">
            <h3 className="text-lg text-white">Kelas Online</h3>
            <h4 className="text-6xl text-teal-500 font-semibold">
              {data?.data?.name ?? "Nama Kelas"}
            </h4>
          </div>
        </div>
        <div className="container mx-auto z-100 relative">
          <Header></Header>
        </div>
      </section>
      <section className="container mx-auto pt-24 relative">
        <div className="absolute top-0 w-full transform -translate-y-1/2">
          <div className="w-3/4 mx-auto">
            <div className="flex justify-between">
              <Feature
                data={{
                  icon: <NameTag className="fill-teal-500" />,
                  meta: "Student",
                  value: data?.data?.total_student ?? 0,
                }}
              />
              <Feature
                data={{
                  icon: <PlayBack className="fill-teal-500" />,
                  meta: "Video",
                  value: data?.data?.total_videos ?? 0,
                }}
              />
              <Feature
                data={{
                  icon: <Certificate className="fill-teal-500" />,
                  meta: "Certificate",
                  value: data?.data?.certificate === 1 ? "Tersedia" : "-",
                }}
              />
            </div>
          </div>
        </div>
        <div>
          <CSSTransition
            in={isSticky}
            timeout={300}
            classNames="meta-price"
            unmountOnExit
          >
            <div className="meta-price w-full bg-white z-50 left-0 py-3">
              <div className="w-3/4 mx-auto">
                <div className="flex items-center">
                  <div className="w-full">
                    <h2 className="text-gray-600">Nama Kelas</h2>
                    <h3 className="text-2xl text-gray-900">
                      {data?.data?.name ?? "Nama Kelas"}
                    </h3>
                  </div>
                  <h5 className="text-2xl text-teal-500 whitespace-nowrap mr-4">
                    {data?.data?.type === "free" ? (
                      "Free"
                    ) : (
                      <span>Rp. {fortmatThousand(data?.data?.price)} </span>
                    )}
                  </h5>
                  <a
                    href={`${process.env.NEXT_PUBLIC_MEMBERPAGE_URL}/joined/${data?.data.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-orange-500 hover:bg-orange-400 transition-all duration-200 focus:outline-none shadow-inner text-white px-6 py-3 whitespace-nowrap"
                  >
                    {data?.data?.type === "free" ? "Enroll Now" : "Buy Now"}
                  </a>
                </div>
              </div>
            </div>
          </CSSTransition>
        </div>
        <div className="w-3/4 mx-auto mt-8">
          <div className="w-full md:w-3/4">
            {/* Course Description */}
            <section>
              <h6 className="font-medium text-gray-900 text-2xl mb-4">
                About <span className="text-teal-500">Coures</span>
              </h6>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-3">
                {data?.data?.description ?? "No Description Found"}
              </p>
            </section>

            {/* Course Photos */}
            <section className="mt-10">
              <h6 className="font-medium text-gray-900 text-2xl mb-4">
                Course <span className="text-teal-500">Photos</span>
              </h6>
              <div className="flex flex-wrap justify-start items-center -mx-4 mt-6">
                {data?.data?.images?.length > 0 ? (
                  data?.data?.images?.map?.((photo, index) => (
                    <CoursePhoto data={photo.image} key={index} />
                  ))
                ) : (
                  <div className="w-full text-center py-12">No Item Found</div>
                )}
              </div>
            </section>

            {/* Rendering Previews */}
            <section className="mt-10">
              <h6 className="font-medium text-gray-900 text-2xl mb-4">
                You Will <span className="text-teal-500">Learn</span>
              </h6>
              {data?.data?.chapters?.length > 0 ? (
                <RenderPreview previews={data.data.chapters}></RenderPreview>
              ) : (
                <div className="w-full text-center py-12">
                  No Chapters Found
                </div>
              )}
            </section>

            {/* Instructor */}
            <section className="mt-10 w-2/3">
              <h6 className="font-medium text-gray-900 text-2xl mb-4">
                Our <span className="text-teal-500">Inscturtor</span>
              </h6>
              <div className="flex items-center">
                <img
                  src={data?.data?.mentor?.profile ?? ""}
                  alt={data?.data?.mentor?.name}
                  className="w-20 h-20 rounded-full overflow-hidden object-cover"
                />
                <div className="ml-4">
                  <h2 className="text-lg text-gray-900">
                    {data?.data?.mentor?.name ?? "Mentor's Name"}
                  </h2>
                  <h3 className="text-sm text-gray-600">
                    {data?.data?.mentor?.profession ?? "Mentor's Profession"}
                  </h3>
                </div>
              </div>
            </section>
            {/* Happy Students */}
            <section className="mt-10 w-6/12">
              <h6 className="font-medium text-gray-900 text-2xl mb-4">
                Happy <span className="text-teal-500">Students</span>
              </h6>
              {data?.data?.reviews?.map?.((testimonial, index) => {
                return (
                  <HappyStudent key={index} data={testimonial}></HappyStudent>
                );
              })}
            </section>
          </div>
        </div>
      </section>
      <div className="mt-24 bg-indigo-1000 py-12" ref={footer}>
        <Footer></Footer>
      </div>
    </>
  );
}

DetailsCourse.getInitialProps = async (props) => {
  const { id } = props.query;
  try {
    const data = await courses.details(id);
    return { data };
  } catch (error) {
    return error;
  }
};

export default DetailsCourse;

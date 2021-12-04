import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icon from "@fortawesome/free-solid-svg-icons";
import { Loading } from "../components";

const AnnouncementDetail = () => {
  return (
    <main className="w-full mx-auto px-4">
      <div className="h-60 w-fulll bg-gradient-to-br from-red-50 to-indigo-50 rounded-lg ml-4 my-2">
        {/* <img
          src="https://images.ctfassets.net/77l22z9el0aa/3hk4Xt2gcurIwwAACqfcxh/52d16b9f41ed4c4e63d6f316dcb0379d/How-to-Announce-your-Engagement.jpg"
          alt=""
          className="w-full h-full"
        /> */}
      </div>

      <div className="-mt-40 w-2/3 card mx-auto shadow-md h-72 bg-gradient-to-br from-indigo-100 to-red-100">
        <Loading type="announcement" />
      </div>

      <article className="w-2/3 mx-auto py-8">
        <h1 className="text-2xl font-bold">
          Thông báo v/v đăng ký tham gia chuyên đề "TỪ AN YÊN ĐẾN MẠNH MẼ” -
          Chuyên đề 1: Cân Bằng Cảm Xúc Giữa Lúc "Bão Giông"
        </h1>
        <h2 className="mt-2 text-sm text-gray-500 flex space-x-4">
          <span>
            <FontAwesomeIcon icon={Icon.faBuilding} /> Phòng Công tác học sinh,
            sinh viên
          </span>
          <span>
            <FontAwesomeIcon icon={Icon.faClock} /> 28/11/2021
          </span>
        </h2>

        <p className="mt-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare
          justo felis, nec lobortis augue luctus et. Sed nibh metus, posuere non
          elit nec, rutrum imperdiet justo. Cras ut nunc felis. Nunc rhoncus
          faucibus ultrices. Suspendisse ut consectetur nulla. Pellentesque
          mattis, ligula at pellentesque tempor, nisl elit porta lectus, eu
          bibendum arcu purus eget urna. Phasellus euismod at elit vel
          convallis. Nullam porttitor mauris risus, eget hendrerit nisl
          tincidunt vel. Phasellus at dolor dui. Aliquam commodo tellus dolor.
          Sed purus nunc, laoreet quis elementum at, elementum at nisl. Praesent
          ut rhoncus orci. Curabitur sit amet est non dolor porttitor facilisis.
          Nullam velit tortor, iaculis eget vehicula quis, sollicitudin id
          magna.
        </p>
        <p className="mt-4">
          Praesent ornare interdum gravida. Donec efficitur leo suscipit aliquet
          pellentesque. In quis purus et dui mollis vulputate. Aenean non
          faucibus felis. Phasellus non aliquet est, non dictum sem. In hac
          habitasse platea dictumst. Integer vehicula elit ac libero egestas
          ornare non sed dolor. Integer vulputate id est nec pulvinar. Cras nec
          sollicitudin lacus, quis sagittis diam. Donec porta libero ac lorem
          semper, eget porttitor quam fermentum. Ut tincidunt feugiat sem, nec
          aliquam mi tincidunt non.
        </p>
        <p className="mt-4">
          Etiam accumsan leo sem, sit amet faucibus ex convallis fermentum. Nunc
          tristique, eros eget rutrum accumsan, dolor quam varius nisl, ut
          euismod arcu urna a lectus. Mauris at dapibus metus. Vestibulum ipsum
          lorem, dictum vitae sapien eget, rutrum rhoncus sapien. Vivamus a nisi
          ut risus porta ultricies. Etiam mollis massa odio, non eleifend leo
          ullamcorper in. Sed ultricies, magna id fermentum volutpat, lorem orci
          placerat mauris, et molestie ipsum mauris sed sapien. Aliquam nulla
          lorem, pretium ut interdum dapibus, suscipit at metus. Proin consequat
          euismod consequat. Aenean placerat turpis et pretium condimentum. Nunc
          hendrerit tellus semper suscipit dignissim. Nullam fringilla, sem nec
          volutpat tincidunt, ex eros congue diam, quis venenatis mauris urna et
          dolor. Vivamus aliquam euismod eros vel pulvinar. Cras arcu augue,
          rutrum nec velit sit amet, aliquet lobortis leo. Donec placerat,
          libero in blandit mattis, turpis nisl varius urna, ac pellentesque dui
          nisi sit amet dui.
        </p>
      </article>
    </main>
  );
};

export default AnnouncementDetail;

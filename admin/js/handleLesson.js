const table = document.querySelector(".lesson_list .row .table");
const tbody = table.querySelector("tbody");
const btnCreateLeson = document.querySelector(".btn-create-lesson");
const dataArray = [];

const lessonHandle = () => {
  setTimeout(() => {
    const lessonItem = document.querySelectorAll(".lesson-item:not(.clone)");
    lessonItem.forEach((row) => {
      handleUppdateLesson(row);
    });
  }, 100);
  handleLessonCreate(btnCreateLeson);
};
const handleLessonCreate = (btnCreate) => {
  //   Event thêm bài học vào bảng
  btnCreate.onclick = () => {
    tbody.innerHTML += listItem();
    const listItemFake = document.querySelectorAll(".lesson-item.clone");
    console.log(listItemFake);
    listItemFake.forEach((fakeItem) => {
      const btnCancel = fakeItem.querySelector("td .btn-delete-lesson");
      console.log(btnCancel);
      const inputs = fakeItem.querySelectorAll("input , textarea");
      inputs.forEach((input) => {
        input.onkeydown = (e) => {
          if (e.keyCode === 13) {
            const newData = {
              lessonID: 0,
              lessonName: fakeItem.querySelector('input[name="lessonName"]')
                .value,
              videoID: fakeItem.querySelector('input[name="videoID"]').value,
              img: fakeItem.querySelector('input[name="img"]').value,
              time: fakeItem.querySelector('input[name="time"]').value,
              content: fakeItem.querySelector('textarea[name="content"]').value,
              decribe: fakeItem.querySelector('input[name="decribe"]').value,
              status: 1,
            };
            dataArray.push(newData);
            fakeItem.querySelectorAll("td.editing").forEach((e) => {
              e.classList.remove("editing");
              e.querySelector("section").innerText =
                e.querySelector("input, textarea").value;
            });
            const lessonItem = document.querySelectorAll(
              ".lesson-item:not(.clone)"
            );
            lessonItem.forEach((row) => {
              console.log(row);
              handleUppdateLesson(row);
              handleDeleteLesson(row.querySelector(".btn-delete-lesson"), row);
            });
          }
        };
      });
      btnCancel.onclick = () => {
        tbody.removeChild(fakeItem);
      };
    });
  };
};
function handleUppdateLesson(row) {
  const sections = row.querySelectorAll("section.view");
  const lessonInput = row.querySelector('input[name="lessonID"]');
  const btndelete = row.querySelector(".btn-delete-lesson");
  //lặp qua tất cả các phần tử section có class view
  setTimeout(() => {
    sections.forEach((section) => {
      section.oninput = () => {
        const lessonID = lessonInput.value;
        const sectionName = section.getAttribute("name");
        const value = section.innerText;
        const existingDataIndex = dataArray.findIndex(
          (data) => data.lessonID === lessonID
        );

        if (existingDataIndex !== -1) {
          //nếu đã có trong mảng , cập mnhập khóa học
          dataArray[existingDataIndex][sectionName] = value;
          return;
        }
        // nếu chưa có trong mảng , thêm đối tượng mới vào mảng
        const newData = {
          lessonID,
          lessonName: row.querySelector('section.view[name="lessonName"]')
            .innerText,
          videoID: row.querySelector('section.view[name="videoID"]').innerText,
          img: row.querySelector('section.view[name="img"]').innerText,
          time: row.querySelector('section.view[name="time"]').innerText,
          content: row.querySelector('section.view[name="content"]').innerText,
          decribe: row.querySelector('section.view[name="decribe"]').innerText,
          status: 2,
        };
        dataArray.push(newData);
        console.log(dataArray);
      };
      //nhấp đúp vào section thì sẽ có thể thay đổi được nôi dung bên trong
      section.ondblclick = () => {
        section.setAttribute("contenteditable", true);
        section.focus();
      };
      section.onblur = () => {
        section.setAttribute("contenteditable", false);
      };
      section.onkeydown = (e) => {
        if (e.keyCode === 13 && e.target.getAttribute("name") !== "content") {
          e.preventDefault();
          section.setAttribute("contenteditable", false);
          return;
        }
      };
      //nhấn xóa từng chi tieets hoa don
      handleDeleteLesson(btndelete, row);
    }, 100);
  });
}
function handleDeleteLesson(btnDelete, row) {
  btnDelete.onclick = () => {
    if (confirm("Bạn có chắc muốn xóa?")) {
      const newData = {
        lessonID: btnDelete.dataset.id,
        lessonName: "",
        videoID: "",
        img: "",
        time: "",
        content: "",
        decribe: "",
        status: 3,
      };
      dataArray.push(newData);
      console.log(btnDelete.dataset.id);
      console.log(dataArray);
      tbody.removeChild(row);
      alert("Bạn đã xóa thành công");
    }
  };
}
function listItem() {
  return `
    <tr class="lesson-item clone">
    <td>
      <div class="form-check">
        <input
          style="margin-left: 5px"
          type="checkbox"
          class="from-check-input"
          value=""
          name = "lessonID"
        />
      </div>
    </td>
    <td 
        class='editing'
        style="
            width: 15%;
            max-height: 48px;
            overflow: hidden;
            text-overflow: ellipsis;
        "
    >
      <section
        contenteditable="false"
        name="lessonName"
        class="view"
        
      >
      </section>
      <input placeholder="Nhập tên bài học"  name="lessonName" class="edit"  />
    </td>
    <td class='editing'>
      <section
        contenteditable="false"
        name="videoID"
        class="view"
      >
      </section>
      <input placeholder="Nhập mã video"  name="videoID" class="edit"  />
    </td>
    <td
        class='editing'
        style="
            width: 10%;
            max-height: 48px;
            overflow: hidden;
            text-overflow: ellipsis;
        "
    >
      <section
        contenteditable="false"
        name="img"
        class="view"
        
      >
      </section>
      <input placeholder="Nhập link hình ảnh"  name="img" class="edit"  />
    </td>
    <td class='editing'>
      <section
        contenteditable="false"
        name="time"
        class="view"
        
      > 
      </section>
      <input placeholder="Thời lượng"  name="time" class="edit"  />
    </td>
    <td
    class='editing'
      style="
        width: 25%;
        max-height: 48px;
        overflow: hidden;
        text-overflow: ellipsis;
      "
    >
      <section
        contenteditable="false"
        name="content"
        class="view"
        
      >
      </section>
      <textarea name="content" style="resize: vertical" name="content" class="edit"></textarea>
    </td>
    <td class='editing'>
      <section
        contenteditable="false"
        name="decribe"
        class="view"
      >
      </section>
      <input placeholder="Nhập mô tả bài học"  name="decribe" class="edit"  />
    </td>
    <td style="text-align: center">
      <button
        href=""
        class="btn btn-link btn-delete-lesson"
        data-id=""
      >
        Hủy
      </button>
    </td>
  </tr>

    `;
}
export { lessonHandle, dataArray };

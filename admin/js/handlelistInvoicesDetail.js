const table = document.querySelector(".Invoices_list .row .table");
const tbody = table.querySelector("tbody");
const btnCreateLeson = document.querySelector(".btn-create-Invoices");
const dataArray = [];

const detailinvoicesHandle = () => {
  setTimeout(() => {
    const InvoicesItem = document.querySelectorAll(
      ".Invoices-item:not(.clone)"
    );
    InvoicesItem.forEach((row) => {
      handleUppdateInvoices(row);
    });
  }, 100);
  handleInvoicesCreate(btnCreateLeson);
};

const handleInvoicesCreate = (btnCreate) => {
  //   Event thêm chi tiết hóa đơn vào bảng
  btnCreate.onclick = () => {
    tbody.innerHTML += listItem();
    const listItemFake = document.querySelectorAll(".Invoices-item.clone");
    listItemFake.forEach((fakeItem) => {
      const btnCancel = fakeItem.querySelector("td .btn-delete-Invoices");
      console.log(btnCancel);
      const inputs = fakeItem.querySelectorAll("input , textarea");
      inputs.forEach((input) => {
        input.onkeydown = (e) => {
          if (e.keyCode === 13) {
            const newData = {
              lessonID: 0,
              courseID: fakeItem.querySelector('input[name="courseID"]').value,
              totalCourse: fakeItem.querySelector('input[name="totalCourse"]')
                .value,
              createDatedetail: fakeItem.querySelector(
                'input[name="createDatedetail"]'
              ).value,
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
              handleUppdateInvoices(row);
              handleDeleteInvoices(
                row.querySelector(".btn-delete-Invoices"),
                row
              );
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
function handleUppdateInvoices(row) {
  const sections = row.querySelectorAll("section.view");
  const InvoicesInput = row.querySelector('input[name="invoicesDetailId"]');
  const btndelete = row.querySelector(".btn-delete-Invoices");
  console.log(btndelete);
  //lặp qua tất cả các phần tử section có class view
  setTimeout(() => {
    sections.forEach((section) => {
      section.oninput = () => {
        const invoicesDetailId = InvoicesInput.value;
        const sectionName = section.getAttribute("name");
        const value = section.innerText;
        const existingDataIndex = dataArray.findIndex(
          (data) => data.invoicesDetailId === invoicesDetailId
        );

        if (existingDataIndex !== -1) {
          //nếu đã có trong mảng , cập mnhập khóa học
          dataArray[existingDataIndex][sectionName] = value;
          return;
        }
        // nếu chưa có trong mảng , thêm đối tượng mới vào mảng
        const newData = {
          invoicesDetailId,
          courseID: row.querySelector('section.view[name="courseID"]')
            .innerText,
          totalCourse: row.querySelector('section.view[name="totalCourse"]')
            .innerText,
          createDatedetail: row.querySelector(
            'section.view[name="createDatedetail"]'
          ).innerText,
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
      //nhấn xóa từng bài học
      handleDeleteInvoices(btndelete, row);
    }, 100);
  });
}
function handleDeleteInvoices(btnDelete, row) {
  btnDelete.onclick = () => {
    if (confirm("Bạn có chắc muốn xóa?")) {
      const newData = {
        invoicesDetailId: btnDelete.dataset.id,
        status: 3,
      };
      dataArray.push(newData);
      console.log(btnDelete.dataset.id);
      console.log(...dataArray);
      tbody.removeChild(row);
      alert("Bạn đã xóa thành công");
    }
  };
}
function listItem() {
  return `
      <tr class="Invoices-item clone">
      <td>
        <div class="form-check">
          <input
            style="margin-left: 5px"
            type="checkbox"
            class="from-check-input"
            value=""
            name = "invoicesDetailId"
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
          name="courseID"
          class="view"
          
        >
        </section>
        <input placeholder="Nhập mã khóa học"  name="courseID" class="edit"  />
      </td>
      <td class='editing'>
        <section
          contenteditable="false"
          name="totalCourse"
          class="view"
        >
        </section>
        <input placeholder="Nhập số tiền của khóa học"  name="totalCourse" class="edit"  />
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
          name="createDatedetail"
          class="view"
          
        >
        </section>
        <input placeholder="Ngày thêm chi tiết hd"  name="createDatedetail" class="edit"  />
      </td>
      <td style="text-align: center">
        <button
          href=""
          class="btn btn-link btn-delete-Invoices"
          data-id=""
        >
          Hủy
        </button>
      </td>
    </tr>
  
      `;
}
export { detailinvoicesHandle, dataArray };

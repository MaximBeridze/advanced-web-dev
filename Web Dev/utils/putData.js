export const putData = async (url, usersData) => {

  const updateUrl = `${url}/${usersData.id}`;

  try {
    const response = await fetch(updateUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        my_key: "my_super_secret_phrase",
      },
      body: JSON.stringify(usersData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    document.querySelector(".modal-body").innerHTML = `
    		<div class="d-flex justify-content-center align-items-center" style="height: 312px;">
			<div class="spinner-border" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</div>
    `;

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const putDataResponse = async (url, updated) => {
  try {
    const response = await putData(url, updated);

    if (response) {
      document.querySelector(
        ".modal-body"
      ).innerHTML = `		<div class="d-flex justify-content-center align-items-center" style="height: 312px;">
			<div class="alert alert-success" role="alert">
				${response.message}
			</div>
		</div>`;

      const myModal = document.getElementById("exampleModal");
      const modal = bootstrap.Modal.getInstance(myModal);
      setTimeout(() => modal.hide(), 700);
    }
  } catch (error) {
    console.error("Failed to update data:", error);

    document.querySelector(".modal-body").innerHTML = `
		<div class="d-flex flex-column justify-content-center align-items-center" style="height: 312px;">
			<div class="alert alert-danger w-100" role="alert">
				${error.message}
			</div>
			<p class="mark">${error.stack}</p>
		</div>
		`;
  }
};

export async function saveDomain(
  formData: FormData
): Promise<"success" | "invalid" | "fail"> {
  await new Promise((res) => setTimeout(res, 1000));

  if (!isValidURL(formData.get("domain"))) {
    return "invalid";
  }

  const res = await fetch("http://localhost:1323/domains", {
    method: "POST",
    body: JSON.stringify({ url: String(formData.get("domain")) }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.status === 400) {
    return "fail";
  }

  if (res.status === 200) {
    return "success";
  }

  //already exists
  if (res.status === 409) {
    return "success";
  }

  return "fail";
}

export async function deleteDomain(formData: FormData) {
  await fetch(`http://localhost:1323/domains?id=${formData.get("urlId")}`, {
    method: "DELETE",
  });
}

function isValidURL(url) {
  const regex =
    /^(https?:\/\/)(localhost|(([a-zA-Z\d]([a-zA-Z\d-]*[a-zA-Z\d])*)\.)+[a-zA-Z]{2,})(:\d{1,5})?(\/.*)?$/;
  return regex.test(url);
}

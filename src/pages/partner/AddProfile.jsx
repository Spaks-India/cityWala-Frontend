import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import API from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

export default function ProfilePage() {
  const { t } = useTranslation();

  const { updatePartnerData } = useAuth();
  const [profile, setProfile] = useState(null);
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState({});
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [subSubcategories, setSubSubcategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await API.get("/categories");
        const sortedCategories = (res.data.categories || []).sort((a, b) =>
          (a.name || '').localeCompare(b.name || '')
        );
        setCategories(sortedCategories);
      } catch (err) {
        console.error("Error loading categories:", err);
      }
    };

    const loadProfile = async () => {
      try {
        const res = await API.get("/partner/profile");
        const partnerData = res.data;
        setProfile(partnerData);
        console.log("Fetched profile data:", partnerData);
        // setForm({
        //     ...partnerData,
        //     category_id: partnerData.category_id?._id || partnerData.category_id || "",
        //     subcategory_id: partnerData.subcategory_id?._id || partnerData.subcategory_id || "",
        //     sub_subcategory_id: partnerData.sub_subcategory_id?._id || partnerData.sub_subcategory_id || "",
        // });
        setForm({
          ...partnerData,
          category_id: partnerData.category_id?._id || partnerData.category_id || "",
          subcategory_id: partnerData.subcategory_id?._id || partnerData.subcategory_id || "",
          sub_subcategory_id: partnerData.sub_subcategory_id?._id || partnerData.sub_subcategory_id || "",
        });


        if (partnerData.category_id?._id) {
          // await loadSubcategories(partnerData.category_id._id);
          const catId =
            partnerData.category_id?._id || partnerData.category_id || "";

          if (catId) await loadSubcategories(catId);

        } else if (partnerData.category_id) {
          await loadSubcategories(partnerData.category_id);
        }

        if (partnerData.subcategory_id?._id) {
          await loadSubSubcategories(partnerData.subcategory_id._id);
        } else if (partnerData.subcategory_id) {
          await loadSubSubcategories(partnerData.subcategory_id);
        }

        console.log(
          "Fetched profile:",
          partnerData?.category_id?.name,
          partnerData?.subcategory_id?.name,
          partnerData?.sub_subcategory_id?.name
        );
      } catch (err) {
        console.error("Error fetching profile:", err);
        alert("Error loading profile data");
      }
    };

    loadCategories();
    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const loadSubcategories = async (categoryId) => {
    try {
      if (!categoryId) {
        setSubcategories([]);
        return;
      }
      const res = await API.get(`/categories/${categoryId}/popular-sub`);
      const sortedSubcategories = (res.data || []).sort((a, b) =>
        (a.name || '').localeCompare(b.name || '')
      );
      setSubcategories(sortedSubcategories);
    } catch (err) {
      console.error("Error loading subcategories:", err);
      setSubcategories([]);
    }
  };

  const loadSubSubcategories = async (subcategoryId) => {
    try {
      if (!subcategoryId) {
        setSubSubcategories([]);
        return;
      }
      const res = await API.get(`/categories/sub/${subcategoryId}/popular-subsub`);
      const sortedSubSubcategories = (res.data || []).sort((a, b) =>
        (a.name || '').localeCompare(b.name || '')
      );
      setSubSubcategories(sortedSubSubcategories);
    } catch (err) {
      console.error("Error loading sub-subcategories:", err);
      setSubSubcategories([]);
    }
  };

  // const handleCategoryChange = async (e) => {
  //     const categoryId = e.target.value;
  //     setForm(prev => ({
  //         ...prev,
  //         category_id: categoryId,
  //         subcategory_id: "",
  //         sub_subcategory_id: "",
  //     }));
  //     await loadSubcategories(categoryId);
  //     console.log("Selected category ID:", categoryId);
  //     setSubSubcategories([]);
  // };
  // const handleCategoryChange = async (e) => {
  //     const categoryId = e.target.value;

  //     setForm(prev => ({
  //         ...prev,
  //         category_id: categoryId,
  //         subcategory_id: "",
  //         sub_subcategory_id: "",
  //     }));

  //     setSubcategories([]);
  //     setSubSubcategories([]);

  //     if (categoryId) {
  //         const res = await API.get(`/categories/${categoryId}/sub`);
  //         setSubcategories(res.data || []);
  //     }
  // };
  const handleCategoryChange = async (e) => {
    const categoryId = e.target.value;

    setForm(prev => ({
      ...prev,
      category_id: categoryId || "",
      subcategory_id: null,
      sub_subcategory_id: null,
    }));

    // 🔥 IMPORTANT: clear BEFORE API call
    setSubcategories([]);
    setSubSubcategories([]);

    if (!categoryId) return;

    await loadSubcategories(categoryId);
  };
  // const handleSubcategoryChange = async (e) => {
  //     const subcategoryId = e.target.value;
  //     setForm(prev => ({
  //         ...prev,
  //         subcategory_id: subcategoryId,
  //         sub_subcategory_id: "",
  //     }));
  //     await loadSubSubcategories(subcategoryId);
  //     console.log("Selected subcategory ID:", subcategoryId);
  // };
  const handleSubcategoryChange = async (e) => {
    const subcategoryId = e.target.value;

    setForm(prev => ({
      ...prev,
      subcategory_id: subcategoryId,
      sub_subcategory_id: null,
    }));

    setSubSubcategories([]);

    if (subcategoryId) {
      const res = await API.get(`/categories/sub/${subcategoryId}/popular-subsub`);
      setSubSubcategories(res.data || []);
    }
  };
  // const handleSave = async () => {
  //     try {
  //         const res = await API.put("/partner/profile", form);
  //         setProfile(res.data.partner);
  //         console.log("Updated profile:", res.data);
  //         setEdit(null);
  //         alert("Updated");
  //     } catch (err) {
  //         console.log(err);
  //     }
  // };

  // const handleSave = async () => {
  //     try {
  //         // Build clean data object with proper ID extraction
  //         const cleanData = {
  //             company_name: form.company_name,
  //             company_url: form.company_url,
  //             company_short_desc: form.company_short_desc,
  //             company_logo: form.company_logo,
  //             name: form.name,
  //             email: form.email,
  //             mobile: form.mobile,
  //             address: form.address,
  //             city_id: form.city_id?._id || form.city_id,
  //             state_id: form.state_id?._id || form.state_id,
  //             postal_code: form.postal_code,
  //             category_id: form.category_id?._id || form.category_id,
  //             subcategory_id: form.subcategory_id?._id || form.subcategory_id,
  //             sub_subcategory_id: form.sub_subcategory_id?._id || form.sub_subcategory_id,
  //             gst_no: form.gst_no,
  //             status: form.status,
  //         };

  //         // Only include adhar_card if it's a file (new upload)
  //         if (form.adhar_card instanceof File) {
  //             const formData = new FormData();
  //             Object.keys(cleanData).forEach(key => {
  //                 if (cleanData[key] !== undefined && cleanData[key] !== null) {
  //                     formData.append(key, cleanData[key]);
  //                 }
  //             });
  //             formData.append('adhar_card', form.adhar_card);

  //             const res = await API.put("/partner/profile", formData, {
  //                 headers: { 'Content-Type': 'multipart/form-data' }
  //             });
  //             setProfile(res.data.partner);
  //             // Update AuthContext and localStorage with new partner data
  //             updatePartnerData(res.data.partner);
  //         } else {
  //             const res = await API.put("/partner/profile", cleanData);
  //             setProfile(res.data.partner);
  //             // Update AuthContext and localStorage with new partner data
  //             updatePartnerData(res.data.partner);
  //         }

  //         setForm(prev => ({ ...prev }));
  //         setEdit(null);
  //         alert("Profile updated successfully!");

  //     } catch (err) {
  //         console.error("UPDATE ERROR:", err.response?.data || err.message);
  //         alert("Error updating profile: " + (err.response?.data?.message || err.message));
  //     }
  // };
  const handleSave = async () => {
    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        let value = form[key];

        if (
          key === "city_id" ||
          key === "state_id" ||
          key === "category_id" ||
          key === "subcategory_id" ||
          key === "sub_subcategory_id"
        ) {
          value = value?._id || value;

          if (!value || value === "") return;
        }

        if (value instanceof File) return;

        if (value !== undefined && value !== null && value !== "") {
          formData.append(key, value);
        }
      });

      if (form.company_logo instanceof File) {
        formData.append("company_logo", form.company_logo);
      }

      if (form.adhar_card instanceof File) {
        formData.append("adhar_card", form.adhar_card);
      }

      const res = await API.put("/partner/profile", formData);

      setProfile(res.data.partner);
      updatePartnerData(res.data.partner);
      setEdit(null);

      alert("Profile updated successfully!");
    } catch (err) {
      console.error("PROFILE UPDATE ERROR:", err.response?.data || err.message || err);
      alert("Error updating profile: " + (err.response?.data?.message || err.message || "Server error"));
    }
  };
  if (!profile) return <div>{t("loading")}</div>;

  return (
    <div className="container py-4">

      {/* HEADER */}
      <h3 className="mb-4">
        {t("partner_profile.title")}
      </h3>

      {/* ───────── COMPANY INFO ───────── */}
      <div className="card p-3 mb-3">

        <div className="d-flex justify-content-between">
          <h5>{t("partner_profile.company_info.title")}</h5>

          {edit === "company" ? (
            <div className="d-flex gap-2">
              <button className="btn btn-success btn-sm" onClick={handleSave}>
                {t("partner_profile.actions.save")}
              </button>

              <button
                className="btn btn-secondary btn-sm"
                onClick={() => { setForm(profile); setEdit(null); }}
              >
                {t("partner_profile.actions.cancel")}
              </button>
            </div>
          ) : (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => { setForm(profile); setEdit("company"); }}
            >
              {t("partner_profile.actions.edit")}
            </button>
          )}
        </div>

        {edit === "company" ? (
          <>
            <input
              type="file"
              onChange={(e) =>
                setForm({ ...form, company_logo: e.target.files[0] })
              }
              className="form-control mb-2"
            />

            <input
              name="company_name"
              value={form.company_name || ""}
              onChange={handleChange}
              className="form-control mb-2"
            />

            <textarea
              name="company_short_desc"
              value={form.company_short_desc || ""}
              onChange={handleChange}
              className="form-control mb-2"
            />

            <input
              name="company_url"
              value={form.company_url || ""}
              onChange={handleChange}
              className="form-control mb-2"
            />
          </>
        ) : (
          <>
            <p>
              <img
                src={
                  profile?.company_logo ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                style={{ maxWidth: "100px" }}
              />
            </p>

            <p>
              <b>{t("partner_profile.company_info.name")}</b>{" "}
              {profile.company_name}
            </p>

            <p>
              <b>{t("partner_profile.company_info.description")}</b>{" "}
              {profile.company_short_desc || "-"}
            </p>

            <p>
              <b>{t("partner_profile.company_info.url")}</b>{" "}
              <a href={profile.company_url || "#"} target="_blank">
                {profile.company_url || "-"}
              </a>
            </p>
          </>
        )}
      </div>

      {/* ───────── BASIC INFO ───────── */}
      <div className="card p-3 mb-3">

        <div className="d-flex justify-content-between">
          <h5>{t("partner_profile.basic_info.title")}</h5>

          {edit === "basic" ? (
            <div className="d-flex gap-2">
              <button className="btn btn-success btn-sm" onClick={handleSave}>
                {t("partner_profile.actions.save")}
              </button>

              <button
                className="btn btn-secondary btn-sm"
                onClick={() => { setForm(profile); setEdit(null); }}
              >
                {t("partner_profile.actions.cancel")}
              </button>
            </div>
          ) : (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => { setForm(profile); setEdit("basic"); }}
            >
              {t("partner_profile.actions.edit")}
            </button>
          )}
        </div>

        {edit === "basic" ? (
          <>
            <input
              name="name"
              value={form.name || ""}
              onChange={handleChange}
              className="form-control mb-2"
            />

            <input
              name="email"
              value={form.email || ""}
              onChange={handleChange}
              className="form-control mb-2"
            />

            <input
              name="mobile"
              value={form.mobile || ""}
              onChange={handleChange}
              className="form-control mb-2"
            />
          </>
        ) : (
          <>
            <p>
              <b>{t("partner_profile.basic_info.name")}</b> {profile.name}
            </p>
            <p>
              <b>{t("partner_profile.basic_info.email")}</b> {profile.email}
            </p>
            <p>
              <b>{t("partner_profile.basic_info.mobile")}</b> {profile.mobile}
            </p>
          </>
        )}
      </div>

      {/* ───────── LOCATION ───────── */}
      <div className="card p-3 mb-3">

        <div className="d-flex justify-content-between">
          <h5>{t("partner_profile.location.title")}</h5>

          {edit === "location" ? (
            <div className="d-flex gap-2">
              <button className="btn btn-success btn-sm" onClick={handleSave}>
                {t("partner_profile.actions.save")}
              </button>

              <button
                className="btn btn-secondary btn-sm"
                onClick={() => { setForm(profile); setEdit(null); }}
              >
                {t("partner_profile.actions.cancel")}
              </button>
            </div>
          ) : (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => { setForm(profile); setEdit("location"); }}
            >
              {t("partner_profile.actions.edit")}
            </button>
          )}
        </div>

        {edit === "location" ? (
          <>
            <input name="address" value={form.address || ""} onChange={handleChange} className="form-control mb-2" />
            <input name="city_id" value={form.city_id || ""} onChange={handleChange} className="form-control mb-2" />
            <input name="state_id" value={form.state_id || ""} onChange={handleChange} className="form-control mb-2" />
            <input name="postal_code" value={form.postal_code || ""} onChange={handleChange} className="form-control mb-2" />
          </>
        ) : (
          <>
            <p><b>{t("partner_profile.location.address")}</b> {profile.address}</p>
            <p><b>{t("partner_profile.location.city")}</b> {profile.city_id}</p>
            <p><b>{t("partner_profile.location.state")}</b> {profile.state_id}</p>
            <p><b>{t("partner_profile.location.postal_code")}</b> {profile.postal_code}</p>
          </>
        )}
      </div>

      {/* ───────── CATEGORY ───────── */}
      <div className="card p-3 mb-3">

        <div className="d-flex justify-content-between">
          <h5>{t("partner_profile.category_info.title")}</h5>

          {edit === "category" ? (
            <div className="d-flex gap-2">
              <button className="btn btn-success btn-sm" onClick={handleSave}>
                {t("partner_profile.actions.save")}
              </button>

              <button
                className="btn btn-secondary btn-sm"
                onClick={() => { setForm(profile); setEdit(null); }}
              >
                {t("partner_profile.actions.cancel")}
              </button>
            </div>
          ) : (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => { setForm(profile); setEdit("category"); }}
            >
              {t("partner_profile.actions.edit")}
            </button>
          )}
        </div>

        {edit === "category" ? (
          <>
            <select
              value={form.category_id || ""}
              onChange={handleCategoryChange}
              className="form-control mb-2"
            >
              <option value="">
                {t("partner_profile.category_info.select_category")}
              </option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <select
              value={form.subcategory_id || ""}
              onChange={handleSubcategoryChange}
              className="form-control mb-2"
            >
              <option value="">
                {t("partner_profile.category_info.select_subcategory")}
              </option>
              {subcategories.map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.name}
                </option>
              ))}
            </select>

            <select
              value={form.sub_subcategory_id || ""}
              onChange={handleChange}
              className="form-control mb-2"
            >
              <option value="">
                {t("partner_profile.category_info.select_subsubcategory")}
              </option>
              {subSubcategories.map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </>
        ) : (
          <>
            <p>
              <b>{t("partner_profile.category_info.category")}</b>{" "}
              {profile.category_id?.name}
            </p>
            <p>
              <b>{t("partner_profile.category_info.sub_category")}</b>{" "}
              {profile.subcategory_id?.name}
            </p>
            <p>
              <b>{t("partner_profile.category_info.sub_sub_category")}</b>{" "}
              {profile.sub_subcategory_id?.name}
            </p>
          </>
        )}
      </div>

      {/* ───────── DOCUMENTS ───────── */}
      <div className="card p-3">

        <div className="d-flex justify-content-between">
          <h5>{t("partner_profile.documents.title")}</h5>

          {edit === "docs" ? (
            <div className="d-flex gap-2">
              <button className="btn btn-success btn-sm" onClick={handleSave}>
                {t("partner_profile.actions.save")}
              </button>

              <button
                className="btn btn-secondary btn-sm"
                onClick={() => { setForm(profile); setEdit(null); }}
              >
                {t("partner_profile.actions.cancel")}
              </button>
            </div>
          ) : (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => { setForm(profile); setEdit("docs"); }}
            >
              {t("partner_profile.actions.edit")}
            </button>
          )}
        </div>

        {edit === "docs" ? (
          <>
            <input
              type="file"
              onChange={(e) =>
                setForm({ ...form, adhar_card: e.target.files[0] })
              }
              className="form-control mb-2"
            />

            <input
              name="gst_no"
              value={form.gst_no || ""}
              onChange={handleChange}
              className="form-control mb-2"
            />

            <input
              name="status"
              value={form.status || ""}
              onChange={handleChange}
              className="form-control mb-2"
            />
          </>
        ) : (
          <>
            <p>
              <b>{t("partner_profile.documents.aadhar")}</b>{" "}
              {profile.adhar_card ? "Uploaded" : "Not uploaded"}
            </p>

            <p>
              <b>{t("partner_profile.documents.gst")}</b>{" "}
              {profile.gst_no || "-"}
            </p>

            <p>
              <b>{t("partner_profile.documents.status")}</b>{" "}
              {profile.status}
            </p>

            <p>
              <b>{t("partner_profile.documents.plan")}</b>{" "}
              {profile.plan}
            </p>
          </>
        )}
      </div>

    </div>
  );
}
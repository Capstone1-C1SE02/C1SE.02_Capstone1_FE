import React from "react";

const ImportFile = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="file">Select Excel file:</label>
        <input
          type="file"
          id="file"
          name="file"
          accept=".xlsx, .xlsm, .xls"
          onChange={handleFileChange}
        />
        <br />
        <input type="submit" value="Import" />
      </form>
    </div>
  );
};

export default ImportFile;

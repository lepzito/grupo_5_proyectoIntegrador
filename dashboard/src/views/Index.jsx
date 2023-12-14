import RowProducts from "../components/RowProducts/RowProducts";
import ContentRow from "../components/ContentRow/ContentRow";
import Table from "../components/Table/Table";

function Index() {
  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Tecno-Juy Dashboard</h1>
      </div>

      {/* <!-- Content Row Products--> */}
      <RowProducts />
      {/* <!-- End Products in Data Base --> */}

      {/* <!-- Content Row Last Movie in Data Base --> */}
      <ContentRow />

      <Table />
    </div>
  );
}

export default Index;

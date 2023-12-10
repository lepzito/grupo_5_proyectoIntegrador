function CategoryCard({ category, total }) {
  return (
    <div className="col-lg-6 mb-4">
      <div className="card bg-primary text-white shadow">
        <div className="card-body">
          {category}: {total}
        </div>
      </div>
    </div>
  );
}
export default CategoryCard;

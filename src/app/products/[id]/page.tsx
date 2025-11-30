import prisma from "@/lib/prisma";

export default async function ProductDetail({ params }) {
  const product = await prisma.product.findUnique({
    where: { id: Number(params.id) },
  });

  if (!product) {
    return (
      <div style={{ padding: 20, color: "#fff" }}>
        <h1>Product not found</h1>
      </div>
    );
  }

  async function deleteProduct() {
    "use server";
    await prisma.product.delete({
      where: { id: Number(params.id) },
    });
  }

  return (
    <div style={{ padding: 46, color: "#fff", maxWidth:680, margin:"0 auto" }}>
      <h1>Product Detail</h1>
      <div style={{width:"100%", display:"flex", flexDirection:"column", alignItems:"center" }}>
        <div style={{
          width: "100%",
          display: 'flex',
          justifyContent: 'center',
          alignItems:'center',
          marginBottom: 40,
        }}>
          {product.image ? (
            <img src={product.image} alt={product.name} style={{
              width: 390,
              height: 290,
              objectFit: "contain",
              borderRadius: 25,
              background: "#222",
              boxShadow:'0 8px 48px #6799df33',
              border: '2px solid #4747be88',
            }}/>
          ) : (
            <div style={{width: 220, height: 190, display:'flex', alignItems:'center', justifyContent:'center', background:'#222', borderRadius:20, fontSize:90, color:'#555', boxShadow:'0 4px 32px #333a' }}>
              🖼️
            </div>
          )}
        </div>
        <div style={{width:'100%', maxWidth:420}}>
          <p style={{fontSize:'1.23rem', fontWeight:700, color:'#ebebff', marginBottom:3}}>Name: {product.name}</p>
          <p style={{fontSize:'1.12rem', color:'#a7d8fd', fontWeight:600}}>Price: {product.price} THB</p>
        </div>
        <form action={deleteProduct} style={{marginTop:36, width:'100%', maxWidth:480}}>
          <button
            type="submit"
            style={{
              width:'100%',
              padding: 22,
              background: "red",
              color: "#fff",
              borderRadius: 14,
              fontWeight:900,
              fontSize:'1.15rem',
              border: 0,
              boxShadow:'0 4px 20px #b7101065',
              marginTop:2,
            }}
          >
            Delete Product
          </button>
        </form>
      </div>
    </div>
  );
}

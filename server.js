const express = require("express");
const sql = require("mssql/msnodesqlv8");
const path = require("path");

const PORT = 3000;
const app = express();
app.use(express.json()); //щбрвботка в джсон
app.use(express.static(path.join(__dirname, "public"))); //coeдиняем пути

const dbConfig = { //подкл к дб
  connectionString:
     "Driver={ODBC Driver 17 for SQL Server};Server=A402PCPREPOD;Database=Kolodka_magazcosmetici;Trusted_Connection=Yes;",
  driver: "msnodesqlv8",
};

app.get("/users", async (req, res) => { //запрос для пользователей
  const connection = await sql.connect(dbConfig); //подкл к бд

  const result = await connection.request().query("SELECT * FROM dbo.user"); //запись ресалт и посл запрос

  res.json(result.recordset); //запись ресалт
});

app.post("/registration", async (req, res) => { //отправляем пост запрос
  const { name, password, email, lastname } = req.body; //тело запроса
  const connection = await sql.connect(dbConfig); //запрос к бд

  await connection
    .request()
    .input("name", sql.VarChar, name)
    .input("password", sql.VarChar, password)
    .input("email", sql.VarChar, email)
    .input("email", sql.VarChar, lastname)
    .query(`
      INSERT INTO dbo.user ( name, password, email, lastname)
      VALUES (@name, @password, @email, @lastname )
    `); //собака для избежания хакер атаки

  res.send("OK");
});

app.post("/login", async (req, res) => {
  try {
    const { name, password, email, lastname } = req.body;

    const connection = await sql.connect(dbConfig);

    const result = await connection
      .request()
      .input("name", sql.VarChar, name)
      .input("password", sql.VarChar, password)
      .input("email", sql.VarChar, email)
      .input("email", sql.VarChar, lastname)
      .query(`
        SELECT * FROM dbo.user
        WHERE name = @name AND password = @password AND email = @email  AND lastname = @lastname
      `);

    if (result.recordset.length === 0) {
      return res.status(401).json({
        message: "Invalid login or password",
      });
    }

    res.json({
      message: "Login successful",
      user: result.recordset[0],
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Login error",
    });
  }
});


app.listen(3000, () => {
  console.log("Server started on port 3000!, http://localhost:3000");
});
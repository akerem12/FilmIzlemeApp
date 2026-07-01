using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class AddUserRole : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "User");

            migrationBuilder.Sql(
                "INSERT INTO [Users] (Username, Password, Email, Role) " +
                "SELECT 'admin', 'admin123', 'admin@filmizleme.com', 'Admin' " +
                "WHERE NOT EXISTS (SELECT 1 FROM [Users] WHERE Username = 'admin');");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM [Users] WHERE Username = 'admin';");

            migrationBuilder.DropColumn(
                name: "Role",
                table: "Users");
        }
    }
}

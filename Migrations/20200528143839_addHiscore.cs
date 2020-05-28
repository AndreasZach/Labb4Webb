using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Lab4Webb.Migrations
{
    public partial class addHiscore : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HiScore",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Role",
                table: "AspNetRoles");

            migrationBuilder.AddColumn<int>(
                name: "HiScoreId",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "HiScores",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Score = table.Column<int>(nullable: false),
                    SubmitDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HiScores", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_HiScoreId",
                table: "AspNetUsers",
                column: "HiScoreId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_HiScores_HiScoreId",
                table: "AspNetUsers",
                column: "HiScoreId",
                principalTable: "HiScores",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_HiScores_HiScoreId",
                table: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "HiScores");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_HiScoreId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "HiScoreId",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<int>(
                name: "HiScore",
                table: "AspNetUsers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "AspNetRoles",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}

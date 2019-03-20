$(document).ready(function() {
  // Position 630 for Deloitte
  $(window).scroll(function() {
    let position = $(this).scrollTop();
    console.log(position);
    if (position >= 150) {
      $(".deloitte-logo").addClass("show-deloitte-logo");
      $(".deloitte-text").addClass("show-deloitte-text");
    } else {
      $(".deloitte-logo").removeClass("show-deloitte-logo");
      $(".deloitte-text").removeClass("show-deloitte-text");
    }
  });
  // Position 980 for UN
  $(window).scroll(function() {
    let position = $(this).scrollTop();
    if (position >= 600) {
      $(".un-logo").addClass("show-un-logo");
      $(".un-text").addClass("show-un-text");
    } else {
      $(".un-logo").removeClass("show-un-logo");
      $(".un-text").removeClass("show-un-text");
    }
  });
  // Position 1245 for RBC
  $(window).scroll(function() {
    let position = $(this).scrollTop();
    if (position >= 790) {
      $(".rbc-logo").addClass("show-rbc-logo");
      $(".rbc-text").addClass("show-rbc-text");
    } else {
      $(".rbc-logo").removeClass("show-rbc-logo");
      $(".rbc-text").removeClass("show-rbc-text");
    }
  });
  // Position 1590 for PwC
  $(window).scroll(function() {
    let position = $(this).scrollTop();
    if (position >= 1150) {
      $(".pwc-logo").addClass("show-pwc-logo");
      $(".pwc-text").addClass("show-pwc-text");
    } else {
      $(".pwc-logo").removeClass("show-pwc-logo");
      $(".pwc-text").removeClass("show-pwc-text");
    }
  });
});
